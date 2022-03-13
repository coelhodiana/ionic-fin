import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutenticacaoPage } from './autenticacao.page';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoPage,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cadastro',
        component: SignUpComponent
      },
      {
        path: 'recuperar-senha',
        component: PasswordRecoveryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacaoPageRoutingModule {}
