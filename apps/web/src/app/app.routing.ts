import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '@kubic/auth';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: '@kubic/login#LoginModule',
    // canLoad: [AuthGuard],
    data: { preload: true },
  },
  /*{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: '@kubic/home#HomeModule',
    data: { preload: true },
  },*/
  /*{
    path: 'dashboard',
    loadChildren: '@kubic/dashboard#DashboardModule',
    data: { preload: true },
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: '@kubic/not-found#NotFoundModule',
  },*/
];

export const AppRouting: ModuleWithProviders =
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules, // TODO: PreloadSelectedModulesList
    paramsInheritanceStrategy: 'always'
  });
