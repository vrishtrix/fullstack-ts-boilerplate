import { Module } from '@nestjs/common';
import { RedisModule } from '@kubic/server';

import { AppController } from './app.controller';

@Module({
  imports: [RedisModule],
  controllers: [AppController],
})
export class AppModule {}
