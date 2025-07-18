import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicDetailsPage } from './mechanic-details.page';

const routes: Routes = [
  {
    path: '',
    component: MechanicDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicDetailsPageRoutingModule {}
