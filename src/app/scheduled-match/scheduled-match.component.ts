import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-scheduled-match',
  templateUrl: './scheduled-match.component.html',
})
export class ScheduledMatchComponent implements OnInit, OnDestroy {
  matches: Match[];
  matchesSubscription: Subscription;
  canStartMatch = true;

  constructor(
    private readonly matchService: MatchService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        this.matches = res.filter((match) => {
          if (match.ongoing) {
            this.canStartMatch = false;
          }

          return match.scheduled || match.ongoing;
        });
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
        scheduled: false,
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
