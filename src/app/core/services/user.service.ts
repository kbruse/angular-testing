import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { Customer, User } from 'interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {

  user: User;
  customer$: Subject<Customer> = new Subject();

  private externalApiUserModel = {
    firstName: '',
    lastName: '',
    activity: ''
  };

  get externalApiUser() {
    return this.externalApiUserModel;
  }

  constructor(private readonly router: Router,
              private readonly api: ApiService) {
  }

  fetchUser(): void {
    this.api.user
      .me()
      .subscribe((result: User) => {
        this.user = result;
        this.externalApiUserModel = {
          firstName: result.firstName,
          lastName: result.lastName,
          activity: 'contributor'
        };
        if (result.customerAuthData) {
          this.customer$.next(result.customerAuthData.currentCustomer);
        }
      });
  }

  logout(): void {
    this.api.auth.logout()
      .pipe(
        tap(() => {
          this.user = undefined;
          this.externalApiUserModel = {
            firstName: '',
            lastName: '',
            activity: ''
          };
          this.customer$.next({} as Customer);
        }),
        catchError((err: HttpErrorResponse) => throwError(err.message)),
        finalize(() => this.router.navigate(['/', 'login']))
      ).subscribe();
  }
}
