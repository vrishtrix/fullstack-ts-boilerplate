import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: '@kubic/home#HomeModule',
    data: { preload: true },
  },
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
