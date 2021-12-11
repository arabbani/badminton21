import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Match } from '../core/modal/match';
import { MatchService } from '../core/services/match.service';

@Component({
  selector: 'app-manage-match',
  templateUrl: './manage-match.component.html',
})
export class ManageMatchComponent implements OnInit, OnDestroy {
  match: Match;
  matchesSubscription: Subscription;
  updatingPoint = false;
  maximumWinningPoint: number;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        const matches = res.filter((match) => match.ongoing);

        if (matches && matches.length) {
          this.match = matches[0];

          if (this.match.winningPoint === 21) {
            this.maximumWinningPoint = 30;
          } else if (this.match.winningPoint === 15) {
            this.maximumWinningPoint = 20;
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
    const currentSet = this.match.sets.filter(
      (set) => set.setNumber === this.match.currentSet
    )[0];

    return teamNumber === 1
      ? currentSet.firstTeamPoint
      : currentSet.secondTeamPoint;
  }

  async addPoint(teamNumber: number) {
    let setCompleted = false;
    this.updatingPoint = true;
    const sets = [...this.match.sets];
    const updatedMatch: Partial<Match> = {};
    sets.forEach((set) => {
      if (set.setNumber === this.match.currentSet) {
        if (teamNumber == 1) {
          ++set.firstTeamPoint;

          if (
            set.firstTeamPoint === set.secondTeamPoint &&
            set.firstTeamPoint === this.match.currentSetWinningPoint - 1 &&
            this.match.currentSetWinningPoint < this.maximumWinningPoint
          ) {
            updatedMatch.currentSetWinningPoint =
              this.match.currentSetWinningPoint + 1;
          } else if (set.firstTeamPoint === this.match.currentSetWinningPoint) {
            if (this.match.currentSet < this.match.numberOfSets) {
              updatedMatch.currentSet = this.match.currentSet + 1;
              updatedMatch.currentSetWinningPoint = this.match.winningPoint;
              sets.push({
                setNumber: updatedMatch.currentSet,
                firstTeamPoint: 0,
                secondTeamPoint: 0,
              });
              setCompleted = true;
            } else {
              updatedMatch.finished = true;
              updatedMatch.winnerTeam = 1;
            }
          }
        } else {
          ++set.secondTeamPoint;

          if (
            set.firstTeamPoint === set.secondTeamPoint &&
            set.secondTeamPoint === this.match.currentSetWinningPoint - 1 &&
            this.match.currentSetWinningPoint < this.maximumWinningPoint
          ) {
            updatedMatch.currentSetWinningPoint =
              this.match.currentSetWinningPoint + 1;
          } else if (
            set.secondTeamPoint === this.match.currentSetWinningPoint
          ) {
            if (this.match.currentSet < this.match.numberOfSets) {
              updatedMatch.currentSet = this.match.currentSet + 1;
              updatedMatch.currentSetWinningPoint = this.match.winningPoint;
              sets.push({
                setNumber: updatedMatch.currentSet,
                firstTeamPoint: 0,
                secondTeamPoint: 0,
              });
              setCompleted = true;
            } else {
              updatedMatch.finished = true;
              updatedMatch.winnerTeam = 2;
            }
          }
        }
      }
    });
    updatedMatch.sets = sets;
    await this.matchService.updateMatch(this.match.id!, updatedMatch);
    this.updatingPoint = false;
    if (setCompleted) {
      this.setCompletionAlert();
    }
  }

  setCompletionAlert() {
    window.alert(`Set ${this.match.currentSet} Completed`);
  }
}
