import { Component, OnDestroy, OnInit } from '@angular/core';
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
  canSchedule = true;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        this.matches = res.filter((match) => {
          if (match.scheduled) {
            this.canSchedule = false;
          }
          return !match.scheduled && !match.finished && !match.ongoing;
        });
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  schedduleMatch(match: Match) {
    this.matchService.updateMatch(match.id!, {
      scheduled: true,
    });
  }
}
