import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const stored: string | null = localStorage.getItem('user');

    if (!stored) {
      return next.handle(request);
    }
    const token: string = JSON.parse(stored).token;

    if (!token) return next.handle(request);

    request = request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }
}
