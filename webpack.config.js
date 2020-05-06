const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
};
