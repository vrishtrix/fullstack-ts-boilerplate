import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';
import { NgxsModule } from '@ngxs/store';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthState } from './auth.state';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
  ],
  // exports: [AuthService],
  imports: [
    SharedModule,
    NgxsModule.forFeature([
      AuthState,
    ]),
  ],
})
export class AuthModule {}
