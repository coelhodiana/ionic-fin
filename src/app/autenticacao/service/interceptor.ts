import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AutenticacaoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if(error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();

    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    return request;
  }
}
