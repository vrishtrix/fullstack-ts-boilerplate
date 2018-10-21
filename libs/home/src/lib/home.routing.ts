import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        data: { title: 'Infrastructure Cloud' }
      }
    ]
  }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
