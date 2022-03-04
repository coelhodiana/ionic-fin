import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { TransacoesService } from './service/transacoes.service';

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.page.html',
  styleUrls: ['./registro-gastos.page.scss'],
})
export class RegistroGastosPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';
  dateValue2 = '';

  transacaoForm = this.fb.group({
    id: [0],
    tipo: ['gasto', Validators.required],
    valor: [null, Validators.required],
    dataInclusao: [''],
    descricao: [''],
  });

  constructor(
    private fb: FormBuilder,
    private transacoesService: TransacoesService
  ) {}

  ngOnInit() {
    this.transacoesService.getTransacoes().subscribe((transacoes) => {
      console.log(transacoes);
    });
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy - hh:mm');
  }

  onSalvarTransacao() {
    console.log(this.transacaoForm.value);
    this.transacoesService
      .postTransacao(this.transacaoForm.value)
      .subscribe((transacao) => {
        console.log(transacao);
      });
  }
}
