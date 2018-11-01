import { forwardRef, Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthModule } from './auth';

@Module({
  imports: [forwardRef(() => AuthModule)],
  exports: [AppService],
  providers: [AppService],
})
export class CommonModule {}
