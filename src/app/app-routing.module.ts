import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)

  },
  {
    path: 'agregar',
    loadChildren: () => import('./paginas/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'eliminar/:idAuto',
    loadChildren: () => import('./paginas/eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./paginas/listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'modificar/:idAuto',
    loadChildren: () => import('./paginas/modificar/modificar.module').then( m => m.ModificarPageModule)
  },
  {
    path: 'automoviles/:idAuto',
    loadChildren: () => import('./paginas/automoviles/automoviles.module').then( m => m.AutomovilesPageModule)
  },
  {
    path: 'listar-admin',
    loadChildren: () => import('./paginas/listar-admin/listar-admin.module').then( m => m.ListarAdminPageModule)
  },
  {
    path: 'listar-carrito',
    loadChildren: () => import('./paginas/listar-carrito/listar-carrito.module').then( m => m.ListarCarritoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./paginas/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },  {
    path: 'mapa',
    loadChildren: () => import('./paginas/mapa/mapa.module').then( m => m.MapaPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
