import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';
import { AuthService } from './auth.service';

@NgModule({
  providers: [AuthService],
  exports: [AuthService],
  imports: [SharedModule],
})
export class AuthModule {}
