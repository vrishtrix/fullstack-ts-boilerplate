import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.APP_SECRET || 'H@llox1234',
    }),
    /*JwtModule.register({
      imports: [AuthService],
      inject: [AuthService],
      useFactory: (auth: AuthService) => ({
        secretOrPrivateKey: auth.getSecret(),
      }),
    }),*/
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}


