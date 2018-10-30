import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@kubic/env/web';

import { transferStateProvider } from './transfer-state';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [transferStateProvider],
})
export class AppBrowserModule {}
