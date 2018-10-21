import { Injectable, Type } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '@env/api';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(<Type<any>>Strategy, 'jwt') {
  constructor(private readonly auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.secret,
    });
  }

  async validate() {}
}
