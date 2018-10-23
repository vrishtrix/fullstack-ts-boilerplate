import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from './auth.state';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate() {
    const token = this.store.selectSnapshot(AuthState.token);
    return !token;
  }
}

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate() {
    const token = this.store.selectSnapshot(AuthState.token);
    return !!token;
  }
}
