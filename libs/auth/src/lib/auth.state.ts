import { Action, State, StateContext } from '@ngxs/store';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AuthPayload } from '@kubic/schemas';

import { AuthLogin, AuthLogout } from './auth.actions';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@State<AuthPayload>({
  name: 'auth',
  defaults: {},
})
export class AuthState {
  constructor(private readonly authService: AuthService) {}

  @Action(AuthLogin)
  login(ctx: StateContext<AuthPayload>, { payload }: AuthLogin) {
    return this.authService.login(payload)
      .pipe(tap(({ token, user }) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          token,
          user,
        });

        return this.authService.store({ token, user });
      }));
  }

  /*@Action(AuthLogout)
  logout(ctx: StateContext<AuthPayload>) {
    return this.authService.logout()
      .pipe(tap(() => {
        ctx.setState({});

        return this.authService.reset();
      }));
  }*/

}
