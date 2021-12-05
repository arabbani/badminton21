import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMatchComponent } from './manage-match.component';

const routes: Routes = [
  {
    path: '',
    component: ManageMatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMatchRoutingModule {}
