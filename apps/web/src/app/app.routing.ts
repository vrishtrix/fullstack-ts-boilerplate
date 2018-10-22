import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {
  IsAuthenticatedGuard,
  IsNotAuthenticatedGuard,
} from '@kubic/auth';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: '@kubic/login#LoginModule',
      canActivate: [IsNotAuthenticatedGuard],
      data: { preload: true },
    },
    {
      path: 'logout',
      loadChildren: '@kubic/logout#LogoutModule',
      // canActivate: [IsAuthenticatedGuard],
      data: { preload: true },
    },
];

export const AppRouting: ModuleWithProviders =
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules, // TODO: PreloadSelectedModulesList
    paramsInheritanceStrategy: 'always'
  });
