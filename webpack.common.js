const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: { vendor: './src/js/vendor.js', main: './src/js/index.js' },

  module: {
    rules: [
      //JS Babel
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      //HTML loader
      {
        test: /\.html$/,
        use: 'html-loader'
      },

      //IMAGES file-loader
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs'
          }
        }
      },
      //SPRITE_IMAGES
      {
        test: /\.svg$/i,

        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              publicPath: './app'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{ cleanupIDs: false }]
            }
          }
        ]
      }
    ]
  },
  plugins: [new SpriteLoaderPlugin()]
};
