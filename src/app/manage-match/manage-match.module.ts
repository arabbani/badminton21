import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageMatchRoutingModule } from './manage-match-routing.module';
import { ManageMatchComponent } from './manage-match.component';

@NgModule({
  declarations: [ManageMatchComponent],
  imports: [CommonModule, ManageMatchRoutingModule],
})
export class ManageMatchModule {}
