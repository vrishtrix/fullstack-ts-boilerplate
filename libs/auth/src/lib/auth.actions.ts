import { User } from '@kubic/schemas';

export interface AuthLoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export class AuthLogin {
  static readonly type = '[Auth] Login';
  constructor(readonly payload: AuthLoginPayload) {}
}

export class AuthLogout {
  static readonly type = '[Auth] Logout';
}

export class AuthSignup {
  static readonly type = '[Auth] Signup';
  constructor(public readonly payload: User) {}
}
