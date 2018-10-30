import { NestFactory } from '@nestjs/core';
import { INestApplication, INestExpressApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as csurf from 'csurf';
import { environment } from '@kubic/env/api';

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
  start: () => Promise<void>;
}

export async function createServer({
 hostname = 'http://localhost',
 autoStart = true,
 port = 3000,
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
  app.use(csurf());

  async function start(): Promise<NestApp> {
    await app.listenAsync(port, hostname);
    console.log(`${name} server started on ${hostname}:${port}`);
    return app;
  }

  return autoStart ? await start() : (<Server>{ app, start });
}
