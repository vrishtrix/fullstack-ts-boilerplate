import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@brunnerlivio/terminus';

import { GraphqlOptions } from './graphql.options';
import { TerminusService } from './terminus.service';

import { AppController } from './app.controller';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppService } from './app.service';

@Module({
  providers: [AppService],
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusService,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
