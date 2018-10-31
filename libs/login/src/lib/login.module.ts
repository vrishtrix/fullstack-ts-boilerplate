import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeModule } from '@foretag/home';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    HomeModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        data: { title: 'Login' },
      },
    ]),
  ],
})
export class LoginModule {}
