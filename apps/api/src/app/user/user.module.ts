import { forwardRef, Module } from '@nestjs/common';

import { CommonModule } from '../common.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from '../auth';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CommonModule),
  ],
  exports: [UserService],
  providers: [
    UserService,
    UserResolver,
  ],
})
export class UserModule {}
