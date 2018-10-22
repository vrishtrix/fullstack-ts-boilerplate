import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server';
import { environment } from '@env/api';
import { User } from '@kubic/schemas';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma';
import { BadRequestException } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly prisma: PrismaService,
    //private readonly jwt: JwtService,
  ) {}

  private createToken(userId: string) {
    return jwt.sign({ userId }, environment.secret);
  }

  private hasValidationErrors(validationErrors: object) {
    return Object.keys(validationErrors).length > 0;
  }

  private throwValidationErrors(action: string, validationErrors: object) {
    throw new UserInputError(
      `Failed to ${action} due to validation errors`,
      { validationErrors },
    );
  }

  @Mutation('login')
  async login(@Args() { email, password }: User) {
    const user = await this.prisma.query.user({ where: { email } });
    if (!user) {
      this.throwValidationErrors('login', {
        email: `No such user found with email`,
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      this.throwValidationErrors('login', {
        password: `Password doesn't match`,
      });
    }

    const token = this.createToken(user.id);
    return {
      token,
      user,
    };
  }

  @Mutation('signup')
  async signup(@Args() args: User) {
    const errors: any = {};

    const emailExists = await this.prisma.query.user({
      where: { email: args.email },
    });
    if (emailExists) {
      errors.email = `Email: ${args.email} is already in use`;
    }

    const usernameExists = await this.prisma.query.user({
      where: { username: args.username },
    });
    if (usernameExists) {
      errors.username = `Username: ${args.username} is already in use`;
    }

    if (this.hasValidationErrors(errors)) {
      this.throwValidationErrors('signup', errors);
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await this.prisma.mutation.createUser({
      data: {
        ...args,
        password,
      }
    });
    const token = this.createToken(user.id);

    return {
      token,
      user,
    };
  }
}
