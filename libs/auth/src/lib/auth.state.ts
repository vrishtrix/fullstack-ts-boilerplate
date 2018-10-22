import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthPayload } from '@kubic/schemas';
import { Observable } from 'rxjs';

import { AuthLogin, AuthLogout } from './auth.actions';
import { AuthService } from './auth.service';
import { AuthCheck } from './auth.actions';

@State<AuthPayload>({
  name: 'auth',
  defaults: {},
})
export class AuthState {
  constructor(private readonly authService: AuthService) {}

  @Selector()
  static isLoggedIn({ token, user }: AuthPayload) {
    return !!(token && user);
  }

  @Selector()
  static isNotLoggedIn({ token, user }: AuthPayload) {
    return !token && !user;
  }

  @Action(AuthCheck)
  check(ctx: StateContext<AuthPayload>) {
    return this.authService.get()
      .pipe(
        // @TODO: add check for server side session
        tap(({ token, user }) => {
          ctx.patchState({ token, user });
        }),
      );
  }

  @Action(AuthLogin)
  login(ctx: StateContext<AuthPayload>, { payload }: AuthLogin): Observable<AuthPayload> {
    return this.authService.login(payload)
      .pipe(switchMap(({ token, user }) => {
        ctx.patchState({
          token,
          user,
        });

        return this.authService.store({ token, user })
          .pipe(map(() => ({ token, user })));
      }));
  }

  @Action(AuthLogout)
  logout(ctx: StateContext<AuthPayload>): Observable<boolean> {
    return this.authService.logout()
      .pipe(switchMap(() => {
        ctx.setState({});

        return this.authService.reset();
      }));
  }

}
