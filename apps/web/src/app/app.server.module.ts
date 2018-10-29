import { ApplicationRef, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ServerTransferStateModule } from '@angular/platform-server';
import { TransferState } from '@angular/platform-browser';
import { filter, first } from 'rxjs/operators';
// import { Request } from 'express';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { IRequest, REQ_KEY } from './request';

export const bootstrapFactory = (
  appRef: ApplicationRef,
  transferState: TransferState,
  req: any, // Request
) => {
  return appRef.isStable.pipe(
    filter(stable => stable),
    first(),
  ).subscribe(() => {
    transferState.set<IRequest>(REQ_KEY, {
      hostname: req.hostname,
      originalUrl: req.originalUrl,
      referer: req.get('referer'),
      token: {
        csrf: req.csrfToken(),
        jwt: req.session['authToken'],
      },
    });
  });
};

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
