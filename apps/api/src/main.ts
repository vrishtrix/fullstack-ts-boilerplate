import { createServer } from '@kubic/server';

import { AppModule } from './app/app.module';

(async () => {
  const { app, start } = await createServer({
    bootstrap: AppModule,
    autoStart: false,
    name: 'API',
  });

  app.useGlobalGuards();

  await start();
})();
