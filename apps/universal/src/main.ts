import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { createServer, AppServerModule } from '@kubic/server';

import { AppModule } from './app.module';
import { webFolder } from './utils';

(async () => {
  const app = await createServer(AppModule);
  const engine = ngExpressEngine({
    bootstrap: AppServerModule,
  });

  app.engine('html', engine);
  app.useStaticAssets(webFolder());
  app.setBaseViewsDir(webFolder());
  app.setViewEngine('html');

  await app.listen(8080);
})();
