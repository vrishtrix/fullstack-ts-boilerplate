import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { CoreModule } from '@kubic/core';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { PreloadSelectedModulesList } from './preloading-strategy';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRouting,
    CoreModule,
  ],
  providers: [
    PreloadSelectedModulesList,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
