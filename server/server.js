var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var path = require('path');
var webpack = require('webpack');
var colors = require('colors');
var favicon = require('koa-favicon');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var devConfig = require('../webpack/webpack.dev');
var compile = webpack(devConfig);

// 全局配置
var globalConfig = require('./config');

var app = new Koa();

var PORT = globalConfig.PORT || 8080;

app.use(bodyParser());

app.use(webpackDevMiddleware(compile, {
    noInfo: false,
    publicPath: devConfig.output.publicPath,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compile));

app.use(require('koa-static')(path.join(__dirname, '../public')));

app.use(views(path.join(__dirname, '../public'), {
    extension: 'html'
}));

app.use(favicon(__dirname + '../favicon.ico'));

//logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(async (ctx) => {
    await ctx.render('index.html');
});


console.log(`---------------------------\n\n正在监听本地端口${PORT}\n\n----------------------------`.green);


app.listen(PORT);