import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { ServerTransferStateModule } from '@angular/platform-server';
import { TransferState } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { bootstrapFactory } from './transfer-state.factory';

@NgModule({
  imports: [ServerTransferStateModule],
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
export class TransferStateModule {}
