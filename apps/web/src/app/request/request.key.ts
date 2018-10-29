import { makeStateKey } from '@angular/platform-browser';
import { IRequest } from './request.interface';

export const REQ_KEY = makeStateKey<IRequest>('req');
