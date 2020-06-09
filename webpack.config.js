const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {NODE_ENV = 'production',} = process.env;
module.exports = {
  watch: NODE_ENV === 'development',
  externals: [ nodeExternals() ],
  entry: './src/server/server.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
}