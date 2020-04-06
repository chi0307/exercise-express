const path = require('path');
const nodeExternals = require('webpack-node-externals');
// nodemon插件 自動重啟
const NodemonPlugin = require('nodemon-webpack-plugin');
// 每次編譯前清除清理資料夾
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  // 根資料夾
  context: path.resolve(__dirname, 'src'),
  // 進入點
  entry: {
    server: './server.ts'
  },
  // 輸出
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            // 解決 Missing class properties transform
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  },
  resolve: {
    // 解析指定副檔名檔案
    extensions: [ '.ts' ]
  },
  externals: [nodeExternals()],
  plugins: [
    new NodemonPlugin(),
    new CleanWebpackPlugin(),
  ],
};