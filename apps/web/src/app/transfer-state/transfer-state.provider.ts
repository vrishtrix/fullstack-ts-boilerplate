import { FactoryProvider } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TransferState } from '@angular/platform-browser';

import { transferStateFactory } from './transfer-state-factory';

export const transferStateProvider: FactoryProvider = {
  provide: REQUEST,
  useFactory: transferStateFactory,
  deps: [TransferState],
};
