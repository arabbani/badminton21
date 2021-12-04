import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchRoutingModule } from './match-routing.module';

@NgModule({
  declarations: [CreateMatchComponent, MatchListComponent],
  imports: [CommonModule, MatchRoutingModule, ReactiveFormsModule],
})
export class MatchModule {}
