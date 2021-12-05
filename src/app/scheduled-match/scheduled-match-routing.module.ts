import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledMatchComponent } from './scheduled-match.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduledMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduledMatchRoutingModule {}
