import { UserCreateInput, UserUpdateInput, UserWhereInput, UserWhereUniqueInput } from '../../../../../libs/schemas/src/lib/prisma/index';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma/index';

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
    const password = await bcrypt.hash(user.password, 10);
    return await this.prisma.mutation.createUser({
      data: {
        ...user,
        password,
      },
    });
  }
}
