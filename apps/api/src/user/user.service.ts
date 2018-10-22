import { UserWhereUniqueInput } from '@kubic/schemas/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@kubic/schemas';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public find(where: UserWhereUniqueInput) {
    console.log(where);
    return this.prisma.query.user({ where });
  }

  public async create(user: User) {
    const password = await bcrypt.hash(user.password, 10);
    return await this.prisma.mutation.createUser({
      data: {
        ...user,
        password,
      }
    });
  }
}
