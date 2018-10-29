import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: BROWSER_DIR,
      bundle: require('./../dist/server/main.js'),
    }),
  ],
})
export class AppModule {}
