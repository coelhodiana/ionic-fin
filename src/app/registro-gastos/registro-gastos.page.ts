import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { TransacoesService } from './service/transacoes.service';
import { Transacao } from './shared/transacao';

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.page.html',
  styleUrls: ['./registro-gastos.page.scss'],
})
export class RegistroGastosPage implements OnInit, OnDestroy {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateValue = '';
  dateValue2 = '';
  transacoes$ = new BehaviorSubject<Transacao[]>([]);

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
      this.transacoesService.atualizarListaTransacoes(transacoes);
    });

    this.transacoes$ = this.transacoesService.obterListaTransacoes();
  }

  ngOnDestroy(): void {
    if (this.transacoes$) {
      this.transacoes$.unsubscribe();
    }
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

  deletarTransacao(id: string) {
    this.transacoesService
      .deletarTransacao(id)
      .pipe(
        tap((res) => {
          console.log(res);

          const listaTransacoes = this.transacoes$.value.filter(
            // eslint-disable-next-line no-underscore-dangle
            (transacao) => transacao._id !== res._id
          );
          this.transacoesService.atualizarListaTransacoes(listaTransacoes);
          console.log(this.transacoesService.obterListaTransacoes().value);
          alert('sucesso');
        }),
        catchError((err) => of(err))
      )
      .subscribe((err) => {
        console.log(err);
      });
  }
}
