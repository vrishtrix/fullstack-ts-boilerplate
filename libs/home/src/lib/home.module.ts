import { NgModule } from '@angular/core';
import { SharedModule } from '@kubic/shared';

import { HomeRouting } from './home.routing';
import { HeaderComponent } from './components';
import {
  HomeLayoutComponent,
  LandingComponent,
  PricingComponent,
} from './containers';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeLayoutComponent,
    LandingComponent,
    PricingComponent,
  ],
  imports: [
    SharedModule,
    HomeRouting,
  ]
})
export class HomeModule {}
