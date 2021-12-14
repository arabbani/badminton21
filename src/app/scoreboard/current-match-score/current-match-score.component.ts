import { Component, Input, OnChanges } from '@angular/core';
import { Match } from 'src/app/core/modal/match';
import { SetDetails } from 'src/app/core/modal/set-details';

@Component({
  selector: 'app-current-match-score',
  templateUrl: './current-match-score.component.html',
  styleUrls: ['./current-match-score.component.css'],
})
export class CurrentMatchScoreComponent implements OnChanges {
  @Input() match: Match;
  previousSets: SetDetails[] | null;

  ngOnChanges() {
    this.previousSets = this.match.sets.filter(
      (set) => set.setNumber !== this.match!.currentSet
    );
  }

  getCurrentPoint(teamNumber: number) {
    const currentSet = this.match!.sets.filter(
      (set) => set.setNumber === this.match!.currentSet
    )[0];

    return teamNumber === 1
      ? currentSet.firstTeamPoint
      : currentSet.secondTeamPoint;
  }
}
