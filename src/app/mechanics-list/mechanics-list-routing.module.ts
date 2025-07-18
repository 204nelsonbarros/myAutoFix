import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicsListPage } from './mechanics-list.page';

const routes: Routes = [
  {
    path: '',
    component: MechanicsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicsListPageRoutingModule {}
