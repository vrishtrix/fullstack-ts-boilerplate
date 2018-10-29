import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';

import { webFolder, webServerFolder } from './utils';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: webFolder(),
      bundle: require(webServerFolder('main.js')),
    }),
  ],
})
export class AppModule {}
