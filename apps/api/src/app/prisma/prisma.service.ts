import { Injectable } from '@nestjs/common';
import { Prisma } from '@foretag/schemas/prisma';
import { environment } from '@foretag/server';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super(environment.prisma);
  }
}
