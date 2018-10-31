import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@foretag/server';

import { UserModule } from '../user';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secretOrPrivateKey: environment.secret,
      signOptions: {
        expiresIn: 3600, // 1hr
      },
    }),
  ],
})
export class AuthModule {}


