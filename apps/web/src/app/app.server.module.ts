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
import { IRequest, REQ_KEY } from './request';

export const bootstrapFactory = (
  appRef: ApplicationRef,
  transferState: TransferState,
  req: Request,
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
        csrf: req['csrfToken'](),
        jwt: req['session']['authToken'],
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
