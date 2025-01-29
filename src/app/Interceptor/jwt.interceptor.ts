import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Correct path

export const jwtInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
};