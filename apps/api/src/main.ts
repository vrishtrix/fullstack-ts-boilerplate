import { environment, createServer } from '@kubic/server';

import { AppModule } from './app/app.module';

createServer({
  bootstrap: AppModule,
  ...environment.apps.api,
}).catch(console.error);
