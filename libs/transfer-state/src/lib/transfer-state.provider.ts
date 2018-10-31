import { FactoryProvider } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { transferStateFactory } from './transfer-state.factory';
import { TRANSFER_STATE_TOKEN } from './transfer-state.tokens';

export const transferStateProvider: FactoryProvider = {
  provide: TRANSFER_STATE_TOKEN,
  useFactory: transferStateFactory,
  deps: [TransferState],
};
