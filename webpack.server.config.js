const webpack = require('webpack');
const { WebpackConfigFactory } = require('@nestjs/ng-universal');

module.exports = WebpackConfigFactory.create(webpack, {
  server: './apps/universal/src/main.ts',
});
