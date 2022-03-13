import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post(
        `${environment.api}/users/login`,
        { email, password },
        { observe: 'response' }
      )
      .pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          this.setSession(
            // eslint-disable-next-line no-underscore-dangle
            res.body._id,
            res.headers.get('x-access-token'),
            res.headers.get('x-refresh-token')
          );
        })
      );
  }

  logout() {
    this.removeSession();

    this.router.navigateByUrl('/');
  }

  signup(email: string, password: string) {
    return this.http.post(`${environment.api}/users`, {
      email,
      password,
    });
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('access-token', accessToken);
  }

  private setSession(
    userId: string,
    accessToken: string,
    refreshToken: string
  ) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }
}
