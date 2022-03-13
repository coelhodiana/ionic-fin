import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticacaoService } from './../service/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  formularioLogin = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogar() {
    this.autenticacaoService
      .login(this.formularioLogin.value.email, this.formularioLogin.value.senha)
      .subscribe({
        next: () => this.router.navigateByUrl('/registro'),
        error: (e) => console.log(e),
      });
  }

  onLogout() {
    this.autenticacaoService.logout();
  }
}
