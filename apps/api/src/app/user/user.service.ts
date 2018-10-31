import { UserCreateInput, UserUpdateInput, UserWhereInput, UserWhereUniqueInput } from '@foretag/schemas/prisma';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public update(args: { data: UserUpdateInput, where: UserWhereUniqueInput }) {
    return this.prisma.mutation.updateUser(args);
  }

  public find(where: UserWhereUniqueInput) {
    return this.prisma.query.user({ where });
  }

  public exists(where: UserWhereInput) {
    return this.prisma.exists.User(where);
  }

  public async create(user: UserCreateInput) {
    const password = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });

    return await this.prisma.mutation.createUser({
      data: {
        ...user,
        password,
      },
    });
  }
}
