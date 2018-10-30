import { createServer } from '@kubic/server';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

createServer({
  bootstrap: AppModule,
  autoStart: false,
  name: environment.app.name,
}).catch(console.error);
