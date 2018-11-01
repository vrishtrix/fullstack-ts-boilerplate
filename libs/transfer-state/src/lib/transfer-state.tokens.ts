import { makeStateKey } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { TransferStateModel } from './transfer-state-model.interface';

export const TRANSFER_STATE_KEY = makeStateKey<TransferStateModel>('transferState');
export const TRANSFER_STATE_TOKEN = new InjectionToken<TransferStateModel>('Foretag<TRANSFER_STATE>');
