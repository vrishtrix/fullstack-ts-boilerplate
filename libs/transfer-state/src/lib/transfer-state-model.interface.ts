import { AuthStateModel } from '@foretag/auth';

export interface TransferStateModel {
  auth: AuthStateModel;
  hostname: string;
  originalUrl: string;
  referer: string;
  app: {
    title: string;
    name: string;
  };
}
