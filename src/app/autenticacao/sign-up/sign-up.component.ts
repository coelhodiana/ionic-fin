import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AutenticacaoService } from './../service/autenticacao.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit() {}

  onSignUp() {
    console.log(this.signupForm.value);
    this.autenticacaoService
      .signup(
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      )
      .subscribe({
        next: () => console.log(),
        error: (e) => console.log(e),
      });
  }
}
