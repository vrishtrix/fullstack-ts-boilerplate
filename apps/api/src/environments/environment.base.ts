const secret = process.env.APP_SECRET;

export const createEnv = (env: any = {}) => ({
  production: false,
  hmr: false,
  secret,
  apps: {
    api: {
      name: process.env.API_NAME,
      port: +process.env.API_PORT,
    },
    ssr: {
      name: process.env.SSR_NAME,
      port: +process.env.SSR_PORT,
    },
    web: {
      name: process.env.APP_NAME,
      title: process.env.APP_DEFAULT_TITLE,
    },
  },
  session: {
    resave: false,
    saveUninitialized: false,
    ttl: 2600,
    secret,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    db: +process.env.REDIS_DB,
  },
  prisma: {
    endpoint: `${process.env.PRISMA_HOST}:${process.env.PRISMA_PORT}`,
    secret: process.env.PRISMA_SECRET,
    debug: true,
  },
  ...env,
});
