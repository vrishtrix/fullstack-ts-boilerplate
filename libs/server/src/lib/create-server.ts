import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as csurf from 'csurf';

import { environment } from '../environments/environment';

export type NestApp = INestApplication & INestExpressApplication;

export interface ServerOptions {
  bootstrap: any;
  name: string;
  port?: number;
  hostname?: string;
  autoStart?: boolean;
}

export interface Server {
  app: NestApp;
  start: () => Promise<NestApp>;
}

export async function createServer({
 autoStart = true,
 port = 3000,
 hostname,
 bootstrap,
 name,
}: ServerOptions): Promise<NestApp | Server> {
  const app = await NestFactory.create(bootstrap);
  const store = new (RedisStore(session))(environment.redis);

  app.use(helmet());
  app.use(session({
    ...environment.session,
    store,
  }));
  app.enableCors();

  if (environment.production) {
    app.use(csurf());
  }

  async function start() {
    await app.listenAsync(port, hostname);
    console.log(`${name} server started on ${hostname || 'http://localhost'}:${port}`);
    return app;
  }

  return autoStart ? await start() : { app, start };
}
