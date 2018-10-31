const webpack = require('webpack');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { join } = require('path');

const apiDir = join(process.cwd(), 'apps', 'api');
const mainEntry =  join(apiDir, 'src', 'main.hmr.ts');

module.exports = {
  entry: ['webpack/hot/poll?1000', mainEntry],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: join(apiDir, 'tsconfig.hmr.json'),
      }),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  output: {
    path: join(__dirname, 'dist', 'hmr-api'),
    filename: 'main.js',
  },
};
