import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@kubic/env/web';
import { transferStateProvider } from '@kubic/transfer-state';

import { AppModule } from './app.module';

@NgModule({
  providers: [transferStateProvider],
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
})
export class AppBrowserModule {}
