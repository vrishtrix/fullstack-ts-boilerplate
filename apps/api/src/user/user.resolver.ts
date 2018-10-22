import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { UserInputError } from 'apollo-server';
import { JwtService } from '@nestjs/jwt';
import { User } from '@kubic/schemas';
import * as bcrypt from 'bcryptjs';

import { GqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  private hasValidationErrors(validationErrors: object) {
    return Object.keys(validationErrors).length > 0;
  }

  private throwValidationErrors(action: string, validationErrors: object) {
    throw new UserInputError(
      `Failed to ${action} due to validation errors`,
      { validationErrors },
    );
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async findUser(@Args('username') username: string) {
    return await this.user.find({ username });
  }

  @Mutation('login')
  async login(@Args() { email, password }: User) {
    const user = await this.user.find({ email });
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

    const token = this.jwt.sign({ id: user.id });
    return {
      token,
      user,
    };
  }

  @Mutation('signup')
  async signup(@Args() { email, username, password }: User) {
    const errors: any = {};

    const emailExists = await this.user.exists({ email });
    if (emailExists) {
      errors.email = `Email: ${email} is already in use`;
    }

    const usernameExists = await this.user.exists({ username });
    if (usernameExists) {
      errors.username = `Username: ${username} is already in use`;
    }

    if (this.hasValidationErrors(errors)) {
      this.throwValidationErrors('signup', errors);
    }

    const user = await this.user.create({
      email,
      username,
      password,
    });

    const token = this.jwt.sign({ id: user.id });
    return {
      token,
      user,
    };
  }
}
