var ejs = require('ejs');
var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.json$/,
      loaders: ['json'],
      include: path.join(__dirname, 'src')
    }]
  },
  externals: {
    window: 'window',
    document: 'document'
  }
};

module.exports = config;
