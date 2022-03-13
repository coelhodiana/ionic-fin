import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro-gastos/registro-gastos.module').then(
        (m) => m.RegistroGastosPageModule
      ),
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module').then( m => m.AutenticacaoPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
