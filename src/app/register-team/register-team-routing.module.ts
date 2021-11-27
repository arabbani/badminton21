import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeamComponent } from './register-team.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterTeamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterTeamRoutingModule {}
