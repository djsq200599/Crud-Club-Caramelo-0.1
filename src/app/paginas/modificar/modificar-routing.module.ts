import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModificarPage } from './modificar.page';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, ReactiveFormsModule],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [ApiService]
})
export class ModificarPageRoutingModule {}
