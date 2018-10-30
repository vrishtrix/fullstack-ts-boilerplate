import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { hmrBootstrap } from './hmr';
// import { bootloader } from '@angularclass/bootloader';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', async () => {
  const main = () => platformBrowserDynamic().bootstrapModule(AppModule);

  if (environment.hmr) {
    if (module.hot) {
      await hmrBootstrap<AppModule>(main);
    } else {
      console.error('HMR is not enabled for webpack-dev-server!');
    }
  } else {
    bootloader(main);
  }
});
