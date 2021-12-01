import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MatchRoutingModule } from './match-routing.module';

@NgModule({
  declarations: [CreateMatchComponent],
  imports: [CommonModule, MatchRoutingModule],
})
export class MatchModule {}
