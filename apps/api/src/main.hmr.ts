import { environment, NestApp, createServer } from '@kubic/server';

import { AppModule } from './app/app.module';

createServer({
  bootstrap: AppModule,
  name: `${environment.apps.api.name} HMR`,
  port: environment.apps.api.port,
}).then((app: NestApp) => {
  if (environment.hmr) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}).catch(console.error);
