import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DonorComponent } from './donor/donor.component';
import { DonorsComponent } from './donors/donors.component';
import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
  declarations: [ScoreboardComponent, DonorsComponent, DonorComponent],
  imports: [CommonModule, ScoreboardRoutingModule],
})
export class ScoreboardModule {}
