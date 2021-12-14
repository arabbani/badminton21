import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
})
export class MatchListComponent implements OnInit, OnDestroy {
  matches: Match[];
  matchesSubscription: Subscription;
  nextMatchNumber: number;
  canStartMatch: boolean = true;

  constructor(
    private readonly matchService: MatchService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        const matches = res.filter((match) => !match.finished);
        this.matches = matches.sort(
          (matchA, matchB) => matchA.matchNumber - matchB.matchNumber
        );

        if (this.matches && this.matches.length) {
          if (this.matches[0].ongoing) {
            this.canStartMatch = false;
            if (this.matches.length > 1) {
              this.nextMatchNumber = this.matches[1].matchNumber;
            }
          } else {
            this.canStartMatch = true;
            this.nextMatchNumber = this.matches[0].matchNumber;
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  async startMatch(match: Match) {
    try {
      await this.matchService.updateMatch(match.id!, {
        ongoing: true,
      });
      this.goToScoreboard();
    } catch (error) {}
  }

  resumeMatch() {
    this.goToScoreboard();
  }

  goToScoreboard() {
    this.router.navigate(['/manage-match']);
  }
}
