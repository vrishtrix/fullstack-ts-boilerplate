import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';
import { NgxsModule } from '@ngxs/store';

import { AuthService } from './auth.service';
import { AuthState } from './auth.state';
import { AuthGuard } from './guards';

@NgModule({
  providers: [
    AuthService,
    AuthGuard,
  ],
  imports: [
    SharedModule,
    NgxsModule.forFeature([
      AuthState,
    ]),
  ],
})
export class AuthModule {}
