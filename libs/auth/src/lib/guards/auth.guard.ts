import { CanActivate, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthState } from '../auth.state';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  @Select(AuthState.jwtToken)
  private readonly token$: Observable<string | undefined>;

  private validToken() {
    return this.token$.pipe(map(token => !!token));
  }

  canLoad() {
    return this.validToken();
  }

  canActivate() {
    return this.validToken();
  }
}
