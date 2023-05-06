import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCarritoPageRoutingModule } from './listar-carrito-routing.module';
import { CarritoService } from 'src/app/services/carrito.service';
import { ListarCarritoPage } from './listar-carrito.page';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCarritoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarCarritoPage],
  providers: [ApiService, CarritoService]
})
export class ListarCarritoPageModule {}
