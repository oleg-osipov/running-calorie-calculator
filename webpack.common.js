const path = require('path');

module.exports = {
  entry: { vendor: './src/js/vendor.js', main: './src/js/index.js' },

  module: {
    rules: [
      //JS Babel
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },

      //HTML loader
      {
        test: /\.html$/,
        use: 'html-loader'
      },

      //IMAGES file-loader
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs'
          }
        }
      }
    ]
  }
};
