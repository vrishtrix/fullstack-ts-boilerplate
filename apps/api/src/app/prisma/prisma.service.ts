import { Injectable } from '@nestjs/common';
import { Prisma } from '@kubic/schemas/prisma';
import { environment } from '@kubic/server';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super(environment.prisma);
  }
}
