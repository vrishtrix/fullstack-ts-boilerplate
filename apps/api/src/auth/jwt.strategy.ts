import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '@env/api';

import { UserService } from '../user';
import { JwtPayload } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly user: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.secret,
    });
  }

  async validate({ id }: JwtPayload) {
    const user = await this.user.find({ id });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
