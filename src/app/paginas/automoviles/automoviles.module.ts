import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomovilesPageRoutingModule } from './automoviles-routing.module';

import { AutomovilesPage } from './automoviles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomovilesPageRoutingModule
  ],
  declarations: [AutomovilesPage]
})
export class AutomovilesPageModule {}
