import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AutenticacaoPageRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoPage } from './autenticacao.page';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AutenticacaoPageRoutingModule
  ],
  declarations: [AutenticacaoPage, LoginComponent, SignUpComponent, PasswordRecoveryComponent]
})
export class AutenticacaoPageModule {}
