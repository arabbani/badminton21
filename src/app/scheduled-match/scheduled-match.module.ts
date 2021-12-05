import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScheduledMatchRoutingModule } from './scheduled-match-routing.module';
import { ScheduledMatchComponent } from './scheduled-match.component';

@NgModule({
  declarations: [ScheduledMatchComponent],
  imports: [CommonModule, ScheduledMatchRoutingModule],
})
export class ScheduledMatchModule {}
