const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/webclient/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
  entry: './webclient/app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {test: /\.tsx?$/, exclude: /__tests__/, loader: "ts-loader"},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
      {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        HOST: JSON.stringify("http://192.168.2.200:3000/"),
      }
    })],
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    disableHostCheck: true,
    /*proxy: {
     '/customers/*': {
     target: 'http://localhost:8080/',
     secure: false
     }
     },*/
    hot: false,
    inline: false
  }
};

module.exports = config;