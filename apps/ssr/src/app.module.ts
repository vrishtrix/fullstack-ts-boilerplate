import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';

import { transferStateMiddleware } from './transfer-state.middleware';
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
  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(transferStateMiddleware)
      .exclude('assets')
      .forRoutes('*');
  }
}
