import { createEnv } from './environment.base';

export const environment = createEnv({
  production: true,
  session: {
    cookie: {
      secure: true,
    },
  },
  redis: {
    pass: process.env.REDIS_PASS,
  },
  prisma: {
    debug: false,
  },
});
