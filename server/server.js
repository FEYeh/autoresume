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
var logger = require('koa-logger');
var moment = require('moment');
var compile = webpack(devConfig);

// 全局配置
var globalConfig = require('./config');

var app = new Koa();
var router2controller = require('./router2controller.js');

var PORT = globalConfig.PORT || 8080;

app.use(logger());
app.use(bodyParser());
app.use(router2controller());

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
    const start = +new Date();
    await next;
  
    const length = ctx.length ? ctx.length.toString() : '-';
    const date = moment().format('YYYY/MM/D HH:mm:ss ZZ');
    const realIp = ctx.header["x-forwarded-for"] || ctx.header["x-real-ip"] || ctx.ip;
    const now = +new Date();
    let requestBody = ctx.request.body || "";
    if(requestBody){
      requestBody = JSON.stringify(requestBody);
    }
  
    requestBody = requestBody.slice(0, 1024*2);
    console.log("---ACCESSLOG ["+ date +"] -", "[STATUS", ctx.status+"]", "[METHOD", ctx.request.method+"]",
          "[URL", ctx.request.href+"]", "[USER-AGENT", ctx.header["user-agent"]+"]",
          "[IP", (realIp)+"]",
          "[REQUEST BODY", requestBody, "]",
          "[RESPONSE-LENGTH", length+"]",
          "[RESPONSE-TIME", (now-start)+"ms]",
        );
});

// response
app.use(async (ctx) => {
    await ctx.render('index.html');
});




console.log(`---------------------------\n\n正在监听本地端口${PORT}\n\n----------------------------`.green);


app.listen(PORT);