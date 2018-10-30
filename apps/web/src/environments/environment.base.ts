export const createEnv = (env: any = {}) => ({
  production: false,
  hmr: false,
  app: {
    name: 'Kubic',
  },
  ...env,
});
