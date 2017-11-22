const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, '../client/index.js'),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/public',
    path: path.resolve(__dirname, '../public/'),
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, // babel 转换为兼容性的 js
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['import', { libraryName: 'antd', style: 'css' }],
            // 按需加载
          ],
        },
        include: path.resolve(__dirname, '../client'),
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(scss|sass)/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    // 注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.png',
      '.gif',
      '.jpg',
      '.scss',
      '.css',
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'AutoResume',
      publicPath: '/public',
      filename: 'index.html',
      template: path.resolve(__dirname, '../views/index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, '../favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../data/**'),
        to: path.resolve(__dirname, '../public'),
      },
      {
        from: path.resolve(__dirname, '../assets/**'),
        to: path.resolve(__dirname, '../public'),
      },
    ], {
      copyUnmodified: true,
    }),
  ],
}
