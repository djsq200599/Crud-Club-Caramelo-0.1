import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [UsuarioService]
})
export class RegistroPageRoutingModule {}
