import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthPayload, loginMutation } from '@kubic/schemas';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { catchError, map, pluck, tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { zip, Observable, throwError } from 'rxjs';
import { AuthState } from '@kubic/auth';

import { AuthLoginPayload } from './auth.actions';

@Injectable()
export class AuthService {
  @Select(AuthState) auth$: Observable<AuthPayload>;

  constructor(
    private readonly apollo: Apollo,
    private readonly localStorage: LocalStorage,
  ) {}

  public store({ token, user }: AuthPayload) {
    return zip(
      this.localStorage.setItem('token', token),
      this.localStorage.setItem('user', user),
    );
  }

  public reset() {
    return zip(
      this.localStorage.removeItem('token'),
      this.localStorage.removeItem('user'),
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.auth$.pipe(
      map(auth => !!(auth.token && auth.user))
    );
  }

  public login(payload: AuthLoginPayload): Observable<AuthPayload> {
    return this.apollo.mutate({
      variables: payload,
      mutation: loginMutation,
    }).pipe(
      pluck<any, AuthPayload>('data.login'),
    );
  }

  /*public logout() {
    return this.apollo.mutate({
      mutation: logoutMutation,
    });
  }*/
}
