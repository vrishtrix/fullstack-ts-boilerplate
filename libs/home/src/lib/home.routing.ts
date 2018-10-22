import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeLayoutComponent,
  LandingComponent,
  LoginComponent,
  PricingComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingComponent,
        data: { title: 'Infrastructure Cloud' },
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: { title: 'Pricing' },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
      },
    ],
  },
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
