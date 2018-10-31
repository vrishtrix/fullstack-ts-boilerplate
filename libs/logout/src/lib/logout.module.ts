import { NgModule } from '@angular/core';
import { SharedModule } from '@foretag/shared';
import { RouterModule } from '@angular/router';

import { LogoutComponent } from './logout.component';
import { LogoutGuard } from './logout.guard';

@NgModule({
  providers: [LogoutGuard],
  declarations: [LogoutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LogoutComponent,
        canActivate: [LogoutGuard],
      },
    ]),
  ],
})
export class LogoutModule {}
