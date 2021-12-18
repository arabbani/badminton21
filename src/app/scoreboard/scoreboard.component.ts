import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';
import { SetDetails } from '../core/modal/set-details';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  ongoingMatch: Match | null;
  nextMatch: Match | null;
  matchesSubscription: Subscription;
  previousSets: SetDetails[] | null;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        const matches = res.filter((match) => match.ongoing);

        if (matches && matches.length) {
          this.nextMatch = null;
          this.ongoingMatch = matches[0];

          this.previousSets = this.ongoingMatch.sets.filter(
            (set) => set.setNumber !== this.ongoingMatch!.currentSet
          );
        } else {
          this.ongoingMatch = null;
          const finishedMatchs = res.filter((match) => !match.finished);
          const nextMatches = finishedMatchs.sort(
            (matchA, matchB) => matchA.matchNumber - matchB.matchNumber
          );

          if (nextMatches && nextMatches.length) {
            this.nextMatch = nextMatches[0];
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  getCurrentPoint(teamNumber: number) {
    const currentSet = this.ongoingMatch!.sets.filter(
      (set) => set.setNumber === this.ongoingMatch!.currentSet
    )[0];

    return teamNumber === 1
      ? currentSet.firstTeamPoint
      : currentSet.secondTeamPoint;
  }
}
