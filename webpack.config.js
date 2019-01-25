const path = require('path');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "server"),
          path.resolve(__dirname, "ignore")
        ],
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
  }
};
