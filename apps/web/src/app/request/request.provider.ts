import { FactoryProvider } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TransferState } from '@angular/platform-browser';

import { requestFactory } from './request.factory';

export const requestProvider: FactoryProvider = {
  provide: REQUEST,
  useFactory: requestFactory,
  deps: [TransferState],
};
