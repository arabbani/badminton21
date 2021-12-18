import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';
import { Config } from '../core/modal/config';
import { SetDetails } from '../core/modal/set-details';
import { ConfigService } from '../core/services/config.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  ongoingMatch: Match | null;
  nextMatch: Match | null;
  matchesSubscription: Subscription;
  configSubscription: Subscription;
  previousSets: SetDetails[] | null;
  config: Config;

  constructor(
    private readonly matchService: MatchService,
    private readonly router: Router,
    private readonly configService: ConfigService
  ) {}

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

    this.configSubscription = this.configService
      .getCofig()
      .subscribe((config) => {
        this.config = config[0];

        if (this.config.showDonor) {
          this.openDonorDialog();
        } else {
          this.closeDonorModal();
        }
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
    const currentSet = this.ongoingMatch!.sets.filter(
      (set) => set.setNumber === this.ongoingMatch!.currentSet
    )[0];

    return teamNumber === 1
      ? currentSet.firstTeamPoint
      : currentSet.secondTeamPoint;
  }

  openDonorDialog() {
    this.router.navigate([{ outlets: { modal: 'donor' } }]);

    setTimeout(() => {
      this.configService.updateConfig(this.config.id!, {
        showDonor: false,
      });
    }, this.config.donorDialogTimeout);
  }

  closeDonorModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
