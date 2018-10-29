import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Select } from '@ngxs/store';
import { AuthState } from '@kubic/auth';
import { User } from '@kubic/schemas';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {
  @Select(AuthState.user)
  private readonly user$: Observable<User | undefined>;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.user$.pipe(
      filter(user => !!user),
      map(({ roles }: any) =>
        route.data['roles'].every(role =>
          roles.includes(role),
        ),
      ),
    );
  }
}
