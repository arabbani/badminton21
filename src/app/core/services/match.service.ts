import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { flatten, uniq } from 'lodash';
import {
  combineLatest,
  lastValueFrom,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Match } from '../modal/match';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  readonly matchesCollection;
  matches$: Observable<Match[]>;

  constructor(
    private afs: AngularFirestore,
    private readonly teamsService: TeamsService
  ) {
    this.matchesCollection = afs.collection<Match>('matches');
    this.matches$ = this.matchesCollection.valueChanges({ idField: 'id' });
  }

  createMAtch(match: Match) {
    return this.matchesCollection.add(match);
  }

  getMatches() {
    return this.matches$.pipe(
      switchMap((matches) => {
        const teamIds = uniq(
          flatten(matches.map((match) => [match.firstTeam, match.secondTeam]))
        );

        return combineLatest([
          of(matches),
          combineLatest(
            teamIds.map((teamId) => this.teamsService.getTeam(teamId))
          ),
        ]);
      }),
      map(([matches, teams]) => {
        return matches.map((match) => {
          const firstTeamData = teams.filter((team) => {
            return team.id === match.firstTeam;
          })[0];
          const secondTeamData = teams.filter(
            (team) => team.id === match.secondTeam
          )[0];
          return {
            ...match,
            firstTeamData: firstTeamData.data(),
            secondTeamData: secondTeamData.data(),
          };
        });
      })
    );
  }

  updateMatch(id: string, match: Partial<Match>) {
    this.afs.doc<Match>(`matches/${id}`).update(match);
  }
}
