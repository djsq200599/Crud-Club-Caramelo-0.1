import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EliminarPage } from './eliminar.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: EliminarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule ],
  exports: [RouterModule],
  providers: [ApiService]

})
export class EliminarPageRoutingModule {}
