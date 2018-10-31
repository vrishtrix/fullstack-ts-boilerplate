import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NgModule } from '@angular/core';
import { CoreModule } from '@foretag/core';
import { TransferStateModule } from '@foretag/transfer-state';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    TransferStateModule,
    CoreModule.forServer(),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
