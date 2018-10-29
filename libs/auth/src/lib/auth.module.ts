import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';
import { NgxsModule } from '@ngxs/store';

// import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';
import { AuthGuard } from './guards';

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
