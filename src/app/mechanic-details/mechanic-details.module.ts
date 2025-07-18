import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MechanicDetailsPageRoutingModule } from './mechanic-details-routing.module';

import { MechanicDetailsPage } from './mechanic-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MechanicDetailsPageRoutingModule
  ],
  declarations: [MechanicDetailsPage]
})
export class MechanicDetailsPageModule {}
