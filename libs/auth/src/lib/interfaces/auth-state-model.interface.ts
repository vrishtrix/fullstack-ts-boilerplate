import { User } from '@foretag/schemas';

export interface AuthStateModel {
  user?: User;
  tokens?: {
    csrf?: string;
    jwt?: string;
  };
}
