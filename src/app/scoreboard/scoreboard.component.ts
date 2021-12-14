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
  ongoingMatch: Match | null;
  matchesSubscription: Subscription;

  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.matchService
      .getMatchesWithTeamData()
      .subscribe((res) => {
        const matches = res.filter((match) => match.ongoing);

        if (matches && matches.length) {
          this.ongoingMatch = matches[0];
        } else {
          this.ongoingMatch = null;
        }
      });
  }

  ngOnDestroy() {
    if (this.matchesSubscription) {
      this.matchesSubscription.unsubscribe();
    }
  }
}
