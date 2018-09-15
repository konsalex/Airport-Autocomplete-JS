var path = require('path');
var webpack = require('webpack');

// In order to run loaders only in src directory //
// const includedDirs = path.join(__dirname,'src')

module.exports = {
 entry: './src/index.js',
 output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'main.bundle.js',
     libraryTarget: 'umd',
     library: 'airport-js',
 },
 module: {
     rules: [ 
    {
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'), 
      loader: "babel-loader" 
    }
  ]
 },
 stats: {
     colors: true
 },
 devtool: 'source-map'
};
