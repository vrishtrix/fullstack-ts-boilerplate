import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { TRANSFER_STATE_TOKEN, TransferStateModel } from '@foretag/transfer-state';
import { AuthPayload } from '@foretag/schemas';
import { Inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthLogin, AuthLogout } from './auth.actions';
import { AuthService } from './auth.service';
import { AuthStateModel } from './interfaces';

@State<AuthStateModel>({
  name: 'auth',
})
export class AuthState implements NgxsOnInit {
  constructor(
    @Inject(TRANSFER_STATE_TOKEN)
    private readonly transferState: TransferStateModel,
    private readonly authService: AuthService,
  ) {}

  ngxsOnInit({ setState }: StateContext<AuthStateModel>) {
    setState(this.transferState.auth);
  }
​
  @Selector()
  static jwtToken({ tokens }: AuthStateModel) {
    return tokens && tokens.jwt;
  }

  @Selector()
  static csrfToken({ tokens }: AuthStateModel) {
    return tokens && tokens.csrf;
  }

  @Selector()
  static user({ user }: AuthStateModel) {
    return user;
  }

  @Action(AuthLogin)
  login(
    { getState, patchState }: StateContext<AuthStateModel>,
    { payload }: AuthLogin,
  ): Observable<AuthPayload> {
    return this.authService.login(payload)
      .pipe(tap(({ jwt, user }) => {
        patchState({
          tokens: { jwt },
          user,
        });
      }));
  }

  @Action(AuthLogout)
  logout({ setState }: StateContext<AuthStateModel>): Observable<boolean> {
    return this.authService.logout()
      .pipe(tap(() => setState({})));
  }

}
