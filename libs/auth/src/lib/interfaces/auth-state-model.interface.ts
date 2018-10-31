import { User } from '@kubic/schemas';

export interface AuthStateModel {
  user?: User;
  tokens?: {
    csrf?: string;
    jwt?: string;
  };
}
