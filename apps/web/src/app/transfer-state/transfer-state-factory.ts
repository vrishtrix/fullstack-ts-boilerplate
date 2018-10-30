import { TransferState } from '@angular/platform-browser';

import { TransferStateModel } from './transfer-state-model.interface';
import { TRANSFER_STATE_KEY } from './transfer-state.key';

export function transferStateFactory(transferState: TransferState) {
  return transferState.get<Partial<TransferStateModel>>(
    TRANSFER_STATE_KEY,
    {},
  );
}
