import { makeStateKey } from '@angular/platform-browser';
import { TransferStateModel } from './transfer-state-model.interface';
import { InjectionToken } from '@angular/core';

export const TRANSFER_STATE_KEY = makeStateKey<TransferStateModel>('transferState');
export const TRANSFER_STATE_TOKEN = new InjectionToken<TransferStateModel>('Foretag<TRANSFER_STATE>');
