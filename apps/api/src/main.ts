import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      preflightContinue: true,
    }
  });
  await app.listen(3000);
})();
