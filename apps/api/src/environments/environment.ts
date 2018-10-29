// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const secret = process.env.APP_SECRET || 'H@llox1234';

export const environment = {
  production: false,
  secret,
  session: {
    resave: false,
    saveUninitialized: false,
    ttl: 2600,
    secret,
  },
  redis: {
    // password: secret,
    host: '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
  },
  prisma: {
    endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4466',
    debug: Boolean(process.env.PRISMA_DEBUG),
    secret,
  },
};
