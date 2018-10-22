import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';

import { AuthState } from './auth.state';
import { AuthService } from './auth.service';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
  @Select(AuthState.isNotLoggedIn) isNotLoggedIn$: Observable<boolean>;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.getCredentials().pipe(
      switchMap(() => this.isNotLoggedIn$),
      tap(isNotLoggedIn => {
        if (!isNotLoggedIn) { // is logged in then redirect to dashboard
          return this.router.navigate(['/dashboard']);
        }
      }),
    );
  }
}

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.getCredentials().pipe(
      switchMap(() => this.isLoggedIn$),
      tap(isLoggedIn => {
        if (!isLoggedIn) { // is not logged in then redirect to login
          return this.router.navigate(['/login']);
        }
      }),
    );
  }
}
