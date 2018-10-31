import { environment, createServer } from '@kubic/server';

import { AppModule } from './app.module';

createServer({
  bootstrap: AppModule,
  ...environment.apps.ssr,
}).catch(console.error);
