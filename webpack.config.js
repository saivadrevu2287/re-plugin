const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'containers', 'App.jsx'),
    popup: path.resolve(__dirname, 'src', 'containers', 'Popup.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin(['./public/']),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'build', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      template: path.resolve(__dirname, 'src', 'build', 'popup.html'),
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
