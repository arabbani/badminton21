import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';
import { SetDetails } from '../core/modal/set-details';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  match: Match | null;
  matchesSubscription: Subscription;
  previousSets: SetDetails[] | null;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        const matches = res.filter((match) => match.ongoing);

        if (matches && matches.length) {
          this.match = matches[0];

          this.previousSets = this.match.sets.filter(
            (set) => set.setNumber !== this.match!.currentSet
          );
        } else {
          this.match = null;
          this.previousSets = null;
        }
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  getCurrentPoint(teamNumber: number) {
    const currentSet = this.match!.sets.filter(
      (set) => set.setNumber === this.match!.currentSet
    )[0];

    return teamNumber === 1
      ? currentSet.firstTeamPoint
      : currentSet.secondTeamPoint;
  }
}
