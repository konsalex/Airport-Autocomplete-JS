var path = require('path');
var webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

// In order to run loaders only in src directory //
// const includedDirs = path.join(__dirname,'src')

module.exports = {
  plugins: [new CompressionPlugin()],
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    libraryTarget: 'umd',
    library: 'airportjs',
  },
  devServer: {
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
};
