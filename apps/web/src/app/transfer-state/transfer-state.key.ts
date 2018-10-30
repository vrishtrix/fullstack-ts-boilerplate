import { makeStateKey } from '@angular/platform-browser';
import { TransferStateModel } from './transfer-state-model.interface';

export const TRANSFER_STATE_KEY = makeStateKey<TransferStateModel>('transferState');
