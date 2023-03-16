const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack Plugin',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        name: 'jate',
        short_name: 'jate',
        description: 'Text editor that can be installed from the web browser',
        background_color: '#01579b',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // CSS files
          use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use plugin
        },
        {
          test: /\.m?js$/, // JS files
          exclude: /(node_modules|bower_components)/, // Exclude node modules
          use: { // Use babel-loader to convert ES6+ --> ES5
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
