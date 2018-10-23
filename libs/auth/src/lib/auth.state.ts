import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthPayload } from '@kubic/schemas';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthLogin, AuthLogout } from './auth.actions';
import { AuthService } from './auth.service';

// https://ngxs.gitbook.io/ngxs/recipes/authentication

@State<AuthPayload>({
  name: 'auth',
})
export class AuthState {
  constructor(private readonly authService: AuthService) {}
​
  @Selector()
  static token({ token }: AuthPayload) {
    return token;
  }

  @Selector()
  static user({ user }: AuthPayload) {
    return user;
  }

  @Action(AuthLogin)
  login(
    { patchState }: StateContext<AuthPayload>,
    { payload }: AuthLogin,
  ): Observable<AuthPayload> {
    return this.authService.login(payload)
      .pipe(tap(({ token, user }) => {
        patchState({
          token,
          user,
        });
      }));
  }

  @Action(AuthLogout)
  logout({ setState }: StateContext<AuthPayload>): Observable<boolean> {
    return this.authService.logout()
      .pipe(tap(() => setState({})));
  }

}
