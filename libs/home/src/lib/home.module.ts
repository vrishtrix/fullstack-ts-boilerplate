import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';

import { HomeRouting } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting,
  ]
})
export class HomeModule {}
