import { createServer } from '@kubic/server';

import { AppModule } from './app.module';

createServer({
  bootstrap: AppModule,
  name: 'Universal',
  port: 8080,
}).catch(console.error);
