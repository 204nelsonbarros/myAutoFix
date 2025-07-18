import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowListPageRoutingModule } from './tow-list-routing.module';

import { TowListPage } from './tow-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowListPageRoutingModule
  ],
  declarations: [TowListPage]
})
export class TowListPageModule {}
