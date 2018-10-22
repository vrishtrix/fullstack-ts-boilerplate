import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthLogout } from '@kubic/auth';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.dispatch(new AuthLogout())
      .pipe(
        map(() => false),
        tap(() => this.router.navigate(['/'])),
      );
  }
}
