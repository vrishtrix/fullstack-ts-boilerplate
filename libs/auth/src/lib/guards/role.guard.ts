import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@kubic/auth';
import { User } from '@kubic/schemas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Roles = string[];

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly user$: Observable<User>;

  constructor(private readonly store: Store) {
    this.user$ = this.store.selectOnce(AuthState.user);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.user$.pipe(
      map(({ roles }: any) =>
        route.data['roles'].every(role =>
          roles.includes(role),
        ),
      ),
    );
  }
}
