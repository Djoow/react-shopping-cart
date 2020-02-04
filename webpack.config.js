const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

module.exports = {
  mode: 'production',
  context: path.join(__dirname, './src'),
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/env", { modules: false }],
              "@babel/react",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      },
      {
        test: /\.s([ac])ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      favicon: '../public/favicon.ico',
      preconnect: ['http://localhost:8081']
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, './src')}/**/*`,  { nodir: true }),
    }),
    new OptimizeCssAssetsPlugin(),
    new StyleExtHtmlWebpackPlugin(),
    new HtmlWebpackPreconnectPlugin(),
    new ScriptExtHtmlWebpackPlugin({
        preload: {
          test: /^preload/,
          chunks: 'all'
        },
        prefetch: {
          test: /^prefetch/,
          chunks: 'all'
        },
        inline: /^main/
      }
    ),
    new CompressionPlugin({
      filename: '[path].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html)$/,
      compressionOptions: { level: 11 },
      minRatio: 0.8,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000
  }
};
