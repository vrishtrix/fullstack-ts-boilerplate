import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthPayload } from '@kubic/schemas';

import { AuthService } from './auth.service';

@Injectable()
export class AuthResolver implements Resolve<Observable<AuthPayload>> {
  constructor(private readonly auth: AuthService) {}

  resolve() {
    return this.auth.getCredentials();
  }
}
