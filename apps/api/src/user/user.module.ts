import { Module } from '@nestjs/common';
// import { JwtModule } from "@nestjs/jwt";

import { UserResolver } from './user.resolver';

@Module({
  // imports: [JwtModule],
  providers: [UserResolver],
})
export class UserModule {}
