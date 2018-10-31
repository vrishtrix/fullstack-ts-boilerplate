import { User } from '../../../schemas/src/lib/prisma/index';

export interface TransferStateModel {
  hostname: string;
  originalUrl: string;
  referer: string;
  app: {
    title: string;
    name: string;
  };
  auth: {
    user?: User,
    tokens: {
      csrf: string;
      jwt?: string;
    };
  };
}
