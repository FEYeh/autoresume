const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('static/[name]-one.[hash:8].css');
const extractSASS = new ExtractTextPlugin('static/[name]-two.[hash:8].css');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
            path.resolve(__dirname, '../client/index.js'),
        ],
        vendor: ['react']
    },
    output: {
        filename: 'static/[name].bundle.[chunkHash:8].js',
        publicPath: '',
        path: path.resolve(__dirname, '../build'),
        chunkFilename: "static/[name].[chunkHash:8].js",
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest']
                },
                include: path.resolve(__dirname, '../client')
            },
            {
                test: /\.css$/,
                // loader: ['style-loader', 'css-loader', 'postcss-loader']
                loader: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.(scss|sass)/,
                loader: extractSASS.extract([ 'css-loader', 'sass-loader', 'postcss-loader' ])
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=8192&name=static/[name].[hash:8].[ext]'
                    }
                ]
            },
            {
                test: /\.(svg|woff|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader?name=static/[name].[hash:8].[ext]'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        extractCSS,
        extractSASS,
        new HtmlWebpackPlugin({
            title: 'React Production',
            publicPath: '/',
            filename: 'index.html',
            template: path.resolve(__dirname, '../views/index.html'),
            inject: 'body',
            favicon: path.resolve(__dirname, '../favicon.ico')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        //js压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minify: true,
            sourcemap: true,
            mangle: true
        })
    ]
}