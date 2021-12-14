import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterTeamRoutingModule } from './register-team-routing.module';
import { RegisterTeamComponent } from './register-team.component';

@NgModule({
  declarations: [RegisterTeamComponent],
  imports: [CommonModule, RegisterTeamRoutingModule, ReactiveFormsModule],
})
export class RegisterTeamModule {}
