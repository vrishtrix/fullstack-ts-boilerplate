import { Injectable } from '@nestjs/common';
import { Prisma } from '@kubic/schemas/prisma';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4466',
      debug: process.env.NODE_ENV !== 'production',
      secret: process.env.PRISMA_SECRET || 'H@llox1234',
    });
  }
}
