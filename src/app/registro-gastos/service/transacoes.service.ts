import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Transacao } from '../shared/transacao';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {
  listaTransacoes$ = new BehaviorSubject<Transacao[]>([]);

  url = 'http://localhost:3000/transacoes';

  constructor(private http: HttpClient) {}

  atualizarListaTransacoes(transacoes: Transacao[]) {
    return this.listaTransacoes$.next(transacoes as Transacao[]);
  }

  atualizarTransacao(transacao: Transacao[]) {
    const transacoesAtuais = this.listaTransacoes$.value;
    const listaAtualizada = [transacao, ...transacoesAtuais];
    return this.listaTransacoes$.next(listaAtualizada as Transacao[]);
  }

  obterListaTransacoes() {
    return this.listaTransacoes$;
  }

  getTransacoes(): Observable<Array<Transacao>> {
    return this.http.get<Transacao[]>(`${environment.api}/transacoes`);
  }

  postTransacao(transacao: Transacao): Observable<any> {
    return this.http.post<Transacao>(
      `${environment.api}/transacoes`,
      transacao
    );
  }

  deletarTransacao(id: string): Observable<any> {
    console.log(id);

    return this.http.delete<Transacao>(`${environment.api}/transacoes/${id}`);
  }
}
