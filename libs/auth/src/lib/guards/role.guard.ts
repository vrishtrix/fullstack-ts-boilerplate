import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Select } from '@ngxs/store';
import { User } from '@foretag/schemas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthState } from '../auth.state';

@Injectable()
export class RoleGuard implements CanActivate {
  @Select(AuthState.user)
  private readonly user$: Observable<User | undefined>;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.user$.pipe(
      map(({ roles }) =>
        route.data['roles'].every(role =>
          roles.includes(role),
        ),
      ),
    );
  }
}
