import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistroGastosPageRoutingModule } from './registro-gastos-routing.module';
import { RegistroGastosPage } from './registro-gastos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroGastosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistroGastosPage],
  providers: [FormBuilder],
})
export class RegistroGastosPageModule {}
