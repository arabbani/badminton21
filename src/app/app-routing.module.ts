import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
