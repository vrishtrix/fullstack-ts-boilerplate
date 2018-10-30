const secret = 'H@llox1234';

export const createEnv = (env: any = {}) => ({
  production: false,
  hmr: false,
  secret,
  app: {
    name: 'Kubic API',
  },
  session: {
    resave: false,
    saveUninitialized: false,
    ttl: 2600,
    secret,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  prisma: {
    endpoint: 'http://localhost:4466',
    debug: true,
    secret,
  },
  ...env,
});
