import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/core/modal/match';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
})
export class MatchListComponent implements OnInit {
  matches$: Observable<Match[]>;
  constructor(private readonly matchService: MatchService) {}

  ngOnInit(): void {
    this.matches$ = this.matchService.getMatches();
  }
}
