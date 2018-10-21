import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  public getSecret() {
    return process.env.APP_SECRET || 'H@llox1234';
  }

  public createToken(userId: string) {
    const accessToken = this.jwt.sign({ userId });
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  public async validate() {}
}