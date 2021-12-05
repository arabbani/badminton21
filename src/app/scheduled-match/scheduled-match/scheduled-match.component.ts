import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatches()
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

  startMatch(match: Match) {
    this.matchService.updateMatch(match.id!, {
      scheduled: false,
      ongoing: true,
    });
  }

  resumeMatch() {}
}
