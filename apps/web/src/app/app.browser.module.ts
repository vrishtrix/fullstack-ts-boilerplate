import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@kubic/env/web';

import { requestProvider } from './request';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [requestProvider],
})
export class AppBrowserModule {}
