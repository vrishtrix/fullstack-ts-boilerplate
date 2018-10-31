import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';
import { User } from '@foretag/schemas/prisma';
import { Request } from 'express';
import * as argon2 from 'argon2';

import { GqlAuthGuard } from '../auth';
import { UserService } from './user.service';
import { AppService } from '../app.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly user: UserService,
    private readonly app: AppService,
  ) {}

  @Query()
  // @UseGuards(GqlAuthGuard)
  findUser(@Args('username') username: string): Promise<User | null> {
    if (!username) {
      this.app.throwValidationErrors('findUser', {
        username: 'Username is required',
      });
    }

    return this.user.find({ username });
  }

  // @UseGuards(GqlAuthGuard)
  /*@Mutation()
  logout(@Req() req: Request) {
    return new Promise(resolve => {
      req['session'].destroy(resolve)
    });
  }*/

  @Mutation()
  async login(
    @Args() { email, password }: User,
    @Req() req: Request,
  ) {
    const user = await this.user.find({ email });
    if (!user) {
      this.app.throwValidationErrors('login', {
        email: `No such user found with email`,
      });
    }

    const valid = await argon2.verify(password, user.password);
    if (!valid) {
      this.app.throwValidationErrors('login', {
        password: `Password doesn't match`,
      });
    }

    const jwt = this.app.createJwtToken(req, user);

    return {
      jwt,
      user,
    };
  }

  @Mutation()
  async signup(
    @Args() { email, username, password }: User,
    @Req() req: Request,
  ) {
    const errors: any = {};

    if (password.length < 6) {
      errors.password = `Password must be at least 6 characters`;
    }

    const emailExists = await this.user.exists({ email });
    if (emailExists) {
      errors.email = `Email ${email} is already in use`;
    }

    const usernameExists = await this.user.exists({ username });
    if (usernameExists) {
      errors.username = `Username ${username} is already in use`;
    }

    if (this.app.hasValidationErrors(errors)) {
      this.app.throwValidationErrors('signup', errors);
    }

    const user = await this.user.create({
      email,
      username,
      password,
    });

    const jwt = this.app.createJwtToken(req, user);

    return {
      jwt,
      user,
    };
  }
}
