import { createServer } from '@kubic/server';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

createServer({
  bootstrap: AppModule,
  ...environment.apps.api,
}).catch(console.error);
