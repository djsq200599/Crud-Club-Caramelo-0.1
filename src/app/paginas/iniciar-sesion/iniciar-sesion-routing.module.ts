import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';

const routes: Routes = [
  {
    path: '',
    component: IniciarSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [UsuarioService]
})
export class IniciarSesionPageRoutingModule {}
