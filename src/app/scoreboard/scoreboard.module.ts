import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';
import { CurrentMatchScoreComponent } from './current-match-score/current-match-score.component';
import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donor/donor.component';

@NgModule({
  declarations: [ScoreboardComponent, CurrentMatchScoreComponent, DonorsComponent, DonorComponent],
  imports: [CommonModule, ScoreboardRoutingModule],
})
export class ScoreboardModule {}
