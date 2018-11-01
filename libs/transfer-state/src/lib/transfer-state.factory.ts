import { TransferState } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { Request } from 'express';

import { TransferStateModel } from './transfer-state-model.interface';
import { TRANSFER_STATE_KEY } from './transfer-state.tokens';

export function transferStateFactory(transferState: TransferState) {
  return transferState.get<Partial<TransferStateModel>>(
    TRANSFER_STATE_KEY,
    {},
  );
}

export function bootstrapFactory(
  appRef: ApplicationRef,
  transferState: TransferState,
  req: Request,
) {
  return appRef.isStable.pipe(
    filter(stable => stable),
    first(),
  ).subscribe(() => {
    transferState.set<TransferStateModel>(
      TRANSFER_STATE_KEY,
      req.app.get(TRANSFER_STATE_KEY),
    );
  });
}
