import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterTeamRoutingModule } from './register-team-routing.module';
import { RegisterTeamComponent } from './register-team.component';

@NgModule({
  declarations: [
    RegisterTeamComponent
  ],
  imports: [CommonModule, RegisterTeamRoutingModule],
})
export class RegisterTeamModule {}
