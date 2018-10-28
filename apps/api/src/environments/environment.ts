// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  secret: process.env.APP_SECRET || 'H@llox1234',
  session: {
    resave: false,
    saveUninitialized: false,
    ttl: 2600
  },
  redis: {
    password: process.env.REDIS_PASS || 'H@llox1234',
    port: process.env.REDIS_PORT || 6379,
  },
  prisma: {
    endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4466',
    secret: process.env.PRISMA_SECRET || 'H@llox1234',
    debug: Boolean(process.env.PRISMA_DEBUG),
  },
};
