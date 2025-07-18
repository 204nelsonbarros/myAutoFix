import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TowDetailsPageRoutingModule } from './tow-details-routing.module';

import { TowDetailsPage } from './tow-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TowDetailsPageRoutingModule
  ],
  declarations: [TowDetailsPage]
})
export class TowDetailsPageModule {}
