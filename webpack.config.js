const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'containers', 'App.jsx'),
    logout: path.resolve(__dirname, 'src', 'containers', 'Logout.jsx'),
    login: path.resolve(__dirname, 'src', 'containers', 'Login.jsx'),
    payments: path.resolve(__dirname, 'src', 'containers', 'Payments.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'builds', 'webapp'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin(['./assets/webapp/']),
    new CopyWebpackPlugin(['./assets/common/']),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'build', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['logout'],
      filename: 'logout.html',
      template: path.resolve(__dirname, 'src', 'build', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['login'],
      filename: 'login.html',
      template: path.resolve(__dirname, 'src', 'build', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['payments'],
      filename: 'payments.html',
      template: path.resolve(__dirname, 'src', 'build', 'payments.html'),
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
