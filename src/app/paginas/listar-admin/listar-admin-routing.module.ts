import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ListarAdminPage } from './listar-admin.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ListarAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule ],
  exports: [RouterModule],
  providers: [ApiService]
})
export class ListarAdminPageRoutingModule {}
