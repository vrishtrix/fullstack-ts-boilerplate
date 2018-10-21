import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeLayoutComponent,
  LandingComponent,
  PricingComponent,
} from './containers';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        data: { title: 'Infrastructure Cloud' },
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: { title: 'Pricing' },
      },
    ],
  },
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
