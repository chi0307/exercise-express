const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  target: 'node',
  node: {
    // fs: 'empty',
  },
  // 進入點
  entry: {
    server: './src/server.ts'
  },
  // 輸出
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      // {
      //   test: /\.(ts)$/,
      //   exclude: /(node_modules)/,
      //   use: 'ts-loader'
      // }
    ]
  },
  externals: [nodeExternals()],
  plugins: [new NodemonPlugin()],
};