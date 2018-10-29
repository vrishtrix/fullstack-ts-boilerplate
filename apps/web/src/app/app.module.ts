import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserTransferStateModule, BrowserModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CoreModule } from '@kubic/core';
import { NgModule } from '@angular/core';
import { environment } from '@kubic/env/web';
import { NxModule } from '@nrwl/nx';

import { PreloadSelectedModulesList } from './preloading-strategy';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule({
  providers: [PreloadSelectedModulesList],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'foretag-kubic',
    }),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    AppRouting,
    CoreModule,
  ],
})
export class AppModule {}
