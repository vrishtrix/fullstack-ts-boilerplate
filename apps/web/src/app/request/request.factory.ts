import { TransferState } from '@angular/platform-browser';

import { IRequest } from './request.interface';
import { REQ_KEY } from './request.key';

export const requestFactory = (transferState: TransferState) =>
  transferState.get<Partial<IRequest>>(REQ_KEY, {});
