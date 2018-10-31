import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthPayload, LOGIN_MUTATION } from '@kubic/schemas';
import { pluck } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthLoginPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  public login(payload: AuthLoginPayload): Observable<AuthPayload> {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload,
    }).pipe(
      pluck('data', 'login'),
    );
  }

  public logout() {
    return of(null);/*return this.apollo.mutate({
      mutation: logoutMutation,
    });*/
  }
}
