import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from '../core/modal/config';
import { Match } from '../core/modal/match';
import { ConfigService } from '../core/services/config.service';
import { MatchService } from '../core/services/match.service';

@Component({
  selector: 'app-manage-match',
  templateUrl: './manage-match.component.html',
})
export class ManageMatchComponent implements OnInit, OnDestroy {
  match: Match;
  matchesSubscription: Subscription;
  configSubscription: Subscription;
  updatingPoint = false;
  maximumWinningPoint: number;
  matchFinished = false;
  config: Config;

  constructor(
    private readonly matchService: MatchService,
    private readonly location: Location,
    private readonly configService: ConfigService
  ) {}

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
    this.configSubscription = this.configService
      .getCofig()
      .subscribe((config) => {
        this.config = config[0];
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }

    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
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
            updatedMatch.currentSetWinningPoint = this.match.winningPoint;

            if (this.match.currentSet + 1 < this.match.numberOfSets) {
              updatedMatch.currentSet = this.match.currentSet + 1;
              set.setWinnerTeam = 1;
              sets.push({
                setNumber: updatedMatch.currentSet,
                firstTeamPoint: 0,
                secondTeamPoint: 0,
              });
              setCompleted = true;
            } else {
              updatedMatch.winnerTeam = 1;
              this.matchFinished = true;
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
            updatedMatch.currentSetWinningPoint = this.match.winningPoint;

            if (this.match.currentSet + 1 < this.match.numberOfSets) {
              updatedMatch.currentSet = this.match.currentSet + 1;
              set.setWinnerTeam = 2;
              sets.push({
                setNumber: updatedMatch.currentSet,
                firstTeamPoint: 0,
                secondTeamPoint: 0,
              });
              setCompleted = true;
            } else {
              updatedMatch.winnerTeam = 2;
              this.matchFinished = true;
            }
          }
        }
      }
    });
    updatedMatch.sets = sets;

    try {
      await this.matchService.updateMatch(this.match.id!, updatedMatch);
      this.updatingPoint = false;

      if (setCompleted) {
        this.setCompletionAlert();
      }

      if (this.matchFinished) {
        this.setFinishAlert();
      }
    } catch (error) {}
  }

  setCompletionAlert() {
    window.alert(`Set ${this.match.currentSet + 1} Completed`);
  }

  setFinishAlert() {
    setTimeout(async () => {
      try {
        await this.matchService.updateMatch(this.match.id!, {
          finished: true,
          ongoing: false,
        });
        this.location.back();
      } catch (error) {}
    }, this.config.matchTimeout);
  }
}
