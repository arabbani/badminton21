import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [CommonModule, ScoreboardRoutingModule],
})
export class ScoreboardModule {}
