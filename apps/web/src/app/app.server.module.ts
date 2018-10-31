import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NgModule } from '@angular/core';
import { CoreModule } from '@kubic/core';
import { TransferStateModule } from '@kubic/transfer-state';

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
