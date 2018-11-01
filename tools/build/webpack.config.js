module.exports = {
  node: true,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: [
          /node_modules/,
          /\.(ngfactory|ngstyle)\.ts$/,
        ],
      },
    ],
  },
};
