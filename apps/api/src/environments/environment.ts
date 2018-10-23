// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  secret: process.env.APP_SECRET || 'H@llox1234',
  prisma: {
    endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4466',
    secret: process.env.PRISMA_SECRET || 'H@llox1234',
    debug: Boolean(process.env.PRISMA_DEBUG),
  },
};
