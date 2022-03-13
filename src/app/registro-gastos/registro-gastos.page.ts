import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

import { AutenticacaoService } from './../autenticacao/service/autenticacao.service';
import { TransacoesService } from './service/transacoes.service';
import { Transacao } from './shared/transacao';

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.page.html',
  styleUrls: ['./registro-gastos.page.scss'],
})
export class RegistroGastosPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  transacaoForm = this.fb.group({
    id: [0],
    tipo: ['fixo', Validators.required],
    valor: [null, Validators.required],
    data: [null],
    identificacao: [''],
  });

  transacoes$ = new BehaviorSubject<Transacao[]>([]);

  constructor(
    private fb: FormBuilder,
    private transacoesService: TransacoesService,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit() {
    this.transacoesService.getTransacoes().subscribe({
      next: (transacoes)=>this.transacoesService.atualizarListaTransacoes(transacoes),
      error: (e)=>console.log(e)

    });

    this.transacoes$ = this.transacoesService.obterListaTransacoes();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy HH:mm');
  }

  onSalvarTransacao() {
    const payload = {
      data:
        this.transacaoForm.get('data').value === null
          ? this.transacaoForm.patchValue({ data: new Date() })
          : this.transacaoForm.patchValue({
              data: new Date(this.transacaoForm.get('data').value),
            }),
      dataInclusao: new Date(),
      ...this.transacaoForm.value,
    };

    if(this.transacaoForm.valid) {
      this.transacoesService.postTransacao(this.transacaoForm.value).subscribe({
        next: (transacao) => {
          this.transacoesService.atualizarTransacao(transacao);
          this.transacaoForm.reset();
        },
        error: (e) => console.log(e),
      });
    } else {
      this.transacaoForm.markAsTouched();
    }
  }

  onDeletar(id: string) {
    this.transacoesService.deletarTransacao(id).subscribe({
      // eslint-disable-next-line no-underscore-dangle
      next: () => this.transacoes$.next(this.transacoes$.value.filter(item=>item._id !== id)),
    });
  }

  onLogout() {
    this.autenticacaoService.logout();
  }
}
