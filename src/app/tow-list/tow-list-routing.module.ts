import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowListPage } from './tow-list.page';

const routes: Routes = [
  {
    path: '',
    component: TowListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TowListPageRoutingModule {}
