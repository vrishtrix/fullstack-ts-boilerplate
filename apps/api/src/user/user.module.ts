import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
  providers: [
    UserService,
    UserResolver,
  ],
})
export class UserModule {}
