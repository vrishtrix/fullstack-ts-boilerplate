import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthPayload, loginMutation } from '@kubic/schemas';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private readonly localStorage: LocalStorage,
    private readonly apollo: Apollo,
  ) {}

  public login(email: string, password: string) {
    return this.apollo.mutate({
      variables: { email, password },
      mutation: loginMutation,
    }).pipe(
      pluck('data.login'),
      map(({ token, user }: AuthPayload) => [
        this.localStorage.setItem('token', token),
        this.localStorage.setItem('user', user),
      ]),
    );
  }
}
