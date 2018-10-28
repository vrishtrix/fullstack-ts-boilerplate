import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server';
import { UseGuards } from '@nestjs/common';
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

  private throwValidationErrors(mutation: string, validationErrors: object) {
    throw new UserInputError(
      `Failed to ${mutation} due to validation errors`,
      { validationErrors },
    );
  }

  private createToken(user: User) {
    return this.jwt.sign({
      id: user.id,
      hash: user.password,
    });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async findUser(@Args('username') username: string) {
    return await this.user.find({ username });
  }

  @Mutation()
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
    await this.user.updateToken(user.id, token);

    return {
      token,
      user,
    };
  }

  @Mutation()
  async signup(@Args() { email, username, password }: User) {
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

    const token = this.jwt.sign({
      id: user.id,
      hash: user.password,
    });

    await this.user.updateToken(user.id, token);

    return {
      token,
      user,
    };
  }
}
