import { createServer } from '@kubic/server';

import { AppModule } from './app.module';

(async () => {
  const app = await createServer(AppModule);
  await app.listen(8080);

  console.log('Universal server running on port: ' + 8080);
})();
