import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { environment } from '@kubic/env/api';
import { Request } from 'express';

import { webFolder, webServerFolder } from './utils';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: webFolder(),
      bundle: require(webServerFolder('main.js')),
    }),
  ],
})
export class AppModule implements NestModule {
  private transferStateMiddleware(req: Request) {
    req.app.set('transferState', {
      hostname: req.hostname,
      originalUrl: req.originalUrl,
      referer: req.get('referer'),
      app: environment.apps.web,
      auth: {
        user: req['session']['user'],
        tokens: {
          jwt: req['session']['authToken'],
          csrf: req['csrfToken'](),
        },
      },
    });
  }

  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(this.transferStateMiddleware)
      .exclude('assets')
      .forRoutes('*');
  }
}
