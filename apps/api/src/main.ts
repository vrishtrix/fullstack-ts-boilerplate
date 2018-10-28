import { AppModule } from './app.module';
import { createServer } from '@kubic/server';

(async () => {
  const app = await createServer(AppModule);
  app.useGlobalGuards();
  await app.listen(3000);
})();
