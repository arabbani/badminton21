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

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatches()
      .subscribe((res) => {
        const matches = res.filter((match) => match.ongoing);

        if (matches && matches.length) {
          this.match = matches[0];
        }
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }

  addPoint(teamNumber: number) {
    const sets = [...this.match.sets];
    sets.forEach((set) => {
      if (set.setNumber === this.match.currentSet) {
        if (teamNumber == 1) {
          ++set.firstTeamPoint;
        } else {
          ++set.secondTeamPoint;
        }
      }
    });
    this.matchService.updateMatch(this.match.id!, {
      sets,
    });
  }
}
