import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AutomovilesPage } from './automoviles.page';
import { HttpClientModule } from '@angular/common/http';
import { CarritoService } from 'src/app/services/carrito.service';

const routes: Routes = [
  {
    path: '',
    component: AutomovilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ApiService, CarritoService]
})
export class AutomovilesPageRoutingModule {}
