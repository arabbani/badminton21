import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MatchListComponent } from './match-list/match-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateMatchComponent,
  },
  {
    path: 'list',
    component: MatchListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
