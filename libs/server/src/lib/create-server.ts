import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as csurf from 'csurf';
import { environment } from '@env/api';

export async function createServer(module: any) {
  const app = await NestFactory.create(module);

  app.use(helmet());
  app.use(session({
    store: new RedisStore(environment.redis),
    ...environment.session,
  }));
  app.use(csurf());
  app.enableCors();

  return app;
}
