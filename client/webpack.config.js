const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js', // Output file name
      path: path.resolve(__dirname, 'dist'), // Output path
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'JATE',  // Title of the page
        template: './src/index.html', // Template to use
      }),
      new MiniCssExtractPlugin(), //CSS plugin
      new InjectManifest({
        swSrc: './src/src-sw.js', // Service worker file
        swDest: 'sw.js', // Output file
      }),
      new WebpackPwaManifest({
        name: 'jate', // App name
        short_name: 'jate', // Short name
        description: 'Text editor that can be installed from the web browser', 
        background_color: '#01579b',
        theme_color: '#7eb4e2',
        start_url: '/', // Start URL
        publicPath: '/', // Path to assets
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
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
          test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image files
          type: 'asset/resource',
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
