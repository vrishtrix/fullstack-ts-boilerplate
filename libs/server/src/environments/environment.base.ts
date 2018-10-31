import * as deepMerge from 'deepmerge';
require('dotenv').config();

const secret = process.env.APP_SECRET;

export const createEnv = (env: any = {}) => deepMerge({
  production: false,
  hmr: false,
  secret,
  apps: {
    api: {
      name: process.env.API_NAME,
      port: +process.env.API_PORT,
      graphql: 'graphql',
    },
    ssr: {
      name: process.env.SSR_NAME,
      port: +process.env.SSR_PORT,
    },
    web: {
      name: process.env.APP_NAME,
      title: process.env.APP_TITLE,
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
    db: +process.env.REDIS_DB || 0,
  },
  prisma: {
    endpoint: `${process.env.PRISMA_PROTO}://${process.env.PRISMA_HOST}:${process.env.PRISMA_PORT}`,
    secret: process.env.PRISMA_SECRET,
    debug: true,
  },
}, env);
