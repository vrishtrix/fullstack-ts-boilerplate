import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as csurf from 'csurf';
import { environment } from '@kubic/env/api';

export interface ServerOptions {
  bootstrap: any;
  name: string;
  port?: number;
  hostname?: string;
  autoStart?: boolean;
}

export interface Server {
  app: INestApplication & INestExpressApplication;
  start: () => Promise<void>;
}

export async function createServer(
  { bootstrap, port = 3000, hostname = 'http://localhost', name, autoStart }: ServerOptions,
): Promise<Server | void> {
  const app = await NestFactory.create(bootstrap);
  const store = new (RedisStore(session))(environment.redis);

  app.use(helmet());
  app.use(session({
    ...environment.session,
    store,
  }));
  app.enableCors();
  app.use(csurf());

  async function start() {
    await app.listenAsync(port, hostname);
    console.log(`${name} server started on ${hostname}:${port}`);
  }

  return autoStart
    ? await start()
    : { app, start };
}
