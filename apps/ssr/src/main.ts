import { environment, createServer } from '@foretag/server';

import { AppModule } from './app.module';

createServer({
  bootstrap: AppModule,
  ...environment.apps.ssr,
}).catch(console.error);
