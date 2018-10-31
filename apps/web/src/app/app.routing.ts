import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '@foretag/auth';

const routes: Routes = [
    {
      path: 'login',
      loadChildren: '@foretag/login#LoginModule',
      data: { preload: true },
    },
    {
      path: 'logout',
      loadChildren: '@foretag/logout#LogoutModule',
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
