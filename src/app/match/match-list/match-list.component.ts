import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
})
export class MatchListComponent implements OnInit, OnDestroy {
  matches: Match[];
  matchesSubscription: Subscription;
  canAddToQueue = true;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatches()
      .subscribe((res) => {
        this.matches = res.filter((match) => !match.inQueue);
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  addToQueue(match: Match) {
    this.matchService.updateMatch(match.id!, {
      ongoing: false,
      inQueue: true,
    });
  }
}
