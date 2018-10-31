export const createEnv = (env: any = {}) => ({
  production: false,
  hmr: false,
  app: {
    name: 'Foretag',
  },
  ...env,
});
