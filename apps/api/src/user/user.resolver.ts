import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { environment } from '@env/api';
import { User } from '@kubic/schemas';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly prisma: PrismaService,
    //private readonly jwt: JwtService,
  ) {}

  private createToken(userId: string) {
    return jwt.sign({ userId }, environment.secret);
  }

  @Mutation('login')
  async login(@Args() { email, password }: User) {
    console.log(email, password);

    const user = await this.prisma.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found with email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = this.createToken(user.id);
    return {
      token,
      user,
    };
  }

  @Mutation('signup')
  async signup(@Args() args: User) {
    const emailExists = await this.prisma.query.user({ where: { email: args.email } });
    if (emailExists) throw new Error(`Email: ${args.email} is already in use`);

    const usernameExists = await this.prisma.query.user({ where: { username: args.username } });
    if (usernameExists) throw new Error(`Username: ${args.username} is already in use`);

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
