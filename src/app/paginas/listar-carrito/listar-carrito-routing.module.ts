import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListarCarritoPage } from './listar-carrito.page';
import { CarritoService } from 'src/app/services/carrito.service';

const routes: Routes = [
  {
    path: '',
    component: ListarCarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [CarritoService]

})
export class ListarCarritoPageRoutingModule {}
