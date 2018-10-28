import { UserCreateInput, UserUpdateInput, UserWhereInput, UserWhereUniqueInput } from '@kubic/schemas/prisma';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public updateToken(id: string, token: string) {
    const lastLogin = new Date().getTime();
    return this.update({
      data: { lastToken: token },
      where: { id },
    });
  }

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
