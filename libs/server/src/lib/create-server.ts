import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as csurf from 'csurf';
import { environment } from '@kubic/env/api';

export async function createServer(module: any) {
  const app = await NestFactory.create(module);
  const store = new (RedisStore(session))(environment.redis);

  app.use(helmet());
  app.use(session({
    ...environment.session,
    store,
  }));
  app.enableCors();
  app.use(csurf());

  return app;
}
