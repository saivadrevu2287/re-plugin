const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    popup: path.resolve(__dirname, 'src', 'containers', 'Popup.jsx'),
    options: path.resolve(__dirname, 'src', 'containers', 'Options.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'builds', 'plugin'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin(['./assets/common/']),
    new CopyWebpackPlugin(['./assets/plugin/']),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      template: path.resolve(__dirname, 'src', 'build', 'popup.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      template: path.resolve(__dirname, 'src', 'build', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /(es)?\.(m?js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
