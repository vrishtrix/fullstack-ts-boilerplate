import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server';
import { Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@kubic/schemas';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { GqlAuthGuard } from '../auth';
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

  private createToken(req: Request, user: User) {
    const token = this.jwt.sign({
      hash: user.password,
      id: user.id,
    });

    req['session'].authToken = token;
    return token;
  }

  @Query()
  // @UseGuards(GqlAuthGuard)
  findUser(@Args('username') username: string): Promise<User | null> {
    if (!username) {
      this.throwValidationErrors('findUser', {
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

    const token = this.createToken(req, user);

    return {
      token,
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

    if (this.hasValidationErrors(errors)) {
      this.throwValidationErrors('signup', errors);
    }

    const user = await this.user.create({
      email,
      username,
      password,
    });

    const token = this.createToken(req, user);

    return {
      token,
      user,
    };
  }
}
