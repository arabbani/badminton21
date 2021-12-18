import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorComponent } from './donor/donor.component';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register-team/register-team.module').then(
        (m) => m.RegisterTeamModule
      ),
  },
  {
    path: 'match',
    loadChildren: () =>
      import('./match/match.module').then((m) => m.MatchModule),
  },
  {
    path: 'scoreboard',
    loadChildren: () =>
      import('./scoreboard/scoreboard.module').then((m) => m.ScoreboardModule),
  },
  {
    path: 'manage-match',
    loadChildren: () =>
      import('./manage-match/manage-match.module').then(
        (m) => m.ManageMatchModule
      ),
  },
  {
    path: 'donor',
    component: DonorComponent,
    outlet: 'modal',
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
