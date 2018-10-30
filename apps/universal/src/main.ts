import { createServer } from '@kubic/server';

import { AppModule } from './app.module';
import { environment } from '@kubic/env/api';

createServer({
  bootstrap: AppModule,
  ...environment.apps.ssr,
}).catch(console.error);
