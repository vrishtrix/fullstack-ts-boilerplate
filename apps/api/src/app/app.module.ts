import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@brunnerlivio/terminus';

import { GraphqlOptions } from './graphql.options';
import { TerminusService } from './terminus.service';

import { AppController } from './app.controller';
import { CommonModule } from './common.module';
import { PrismaModule } from './prisma';
import { UserModule } from './user';
import { AuthModule } from './auth';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusService,
    }),
    CommonModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
