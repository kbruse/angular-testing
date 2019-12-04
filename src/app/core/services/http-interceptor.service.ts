import { Injectable } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import { UserService } from 'app/core/services/user.service';
import { ErrorCodeEnum } from 'app/core/enums';
import { ErrorResponse } from 'interfaces';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  private routeToLogin = false;

  constructor(private readonly router: Router,
              private readonly user: UserService) {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart),
      tap((event: NavigationStart) => this.routeToLogin = event.url === '/login')
    ).subscribe();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorResponse: ErrorResponse = error.error;

          if (error.status === 401) {
            if (window.location.pathname !== '/login' && !this.routeToLogin) {
              this.router.navigate(['/', 'login']);
            }
          }

          if (!errorResponse) { return throwError(error); }

          switch (errorResponse.code) {
            case ErrorCodeEnum.EXTERNAL_API_ERROR:
            case ErrorCodeEnum.EXTERNAL_API_NOT_FOUND_ERROR:
            case ErrorCodeEnum.EXTERNAL_API_UNKNOWN_ERROR:
              this.user.logout();
              break;
          }
          return throwError(errorResponse);
        })
      );
  }
}
