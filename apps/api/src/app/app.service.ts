import { UserInputError } from 'apollo-server';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '@foretag/schemas/prisma';

@Injectable()
export class AppService {
  constructor(private readonly jwt: JwtService) {}

  public hasValidationErrors(validationErrors: object) {
    return Object.keys(validationErrors).length > 0;
  }

  public throwValidationErrors(action: string, validationErrors: object) {
    throw new UserInputError(
      `Failed to ${action} due to validation errors`,
      { validationErrors },
    );
  }

  public createJwtToken(req: Request, user: User) {
    const token = this.jwt.sign({
      hash: user.password,
      id: user.id,
    });

    req['session'].jwtToken = token;
    return token;
  }
}
