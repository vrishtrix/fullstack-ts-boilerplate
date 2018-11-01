import { Request, Response, NextFunction } from 'express';
import { environment } from '@foretag/server';

import { TRANSFER_STATE_KEY } from './transfer-state.tokens';

export function transferStateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.app.set(TRANSFER_STATE_KEY, {
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    referer: req.get('referer'),
    app: environment.apps.web,
    auth: {
      user: req['session']['user'],
      tokens: {
        jwt: req['session']['jwtToken'],
        csrf: req['csrfToken'](),
      },
    },
  });

  next();
}
