import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthPayload, loginMutation, User } from '@kubic/schemas';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map, pluck } from 'rxjs/operators';
import { Observable, of, forkJoin, merge } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthCheck, AuthLoginPayload } from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private readonly apollo: Apollo,
    private readonly _store: Store,
    private readonly localStorage: LocalStorage,
  ) {}

  public get(): Observable<AuthPayload> {
    return forkJoin(
      this.localStorage.getItem('token'),
      this.localStorage.getItem('user'),
    ).pipe(
      map(([token, user]: [string, User]) => ({
        token,
        user,
      })),
    );
  }

  public store({ token, user }: AuthPayload) {
    return merge(
      this.localStorage.setItem('token', token),
      this.localStorage.setItem('user', user),
    );
  }

  public reset() {
    return merge(
      this.localStorage.removeItem('token'),
      this.localStorage.removeItem('user'),
    );
  }

  public getCredentials(): Observable<AuthPayload> {
    return this._store.dispatch(new AuthCheck())
      .pipe(pluck('auth'));
  }

  public login(payload: AuthLoginPayload): Observable<AuthPayload> {
    return this.apollo.mutate({
      variables: payload,
      mutation: loginMutation,
    }).pipe(
      pluck<any, AuthPayload>('data', 'login'),
    );
  }

  public logout() {
    return of(null);/*return this.apollo.mutate({
      mutation: logoutMutation,
    });*/
  }
}
