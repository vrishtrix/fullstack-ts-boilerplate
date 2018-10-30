import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TransferState } from '@angular/platform-browser';
import { filter, first } from 'rxjs/operators';
import { CoreModule } from '@kubic/core';
import { Request } from 'express';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TransferStateModel, TRANSFER_STATE_KEY } from './transfer-state';

export const bootstrapFactory = (
  appRef: ApplicationRef,
  transferState: TransferState,
  req: Request,
) => {
  return appRef.isStable.pipe(
    filter(stable => stable),
    first(),
  ).subscribe(() => {
    transferState.set<TransferStateModel>(
      TRANSFER_STATE_KEY,
      req.app.get('transferState'),
    );
  });
};

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    CoreModule.forServer(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: bootstrapFactory,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        REQUEST,
      ],
    },
  ],
})
export class AppServerModule {}
