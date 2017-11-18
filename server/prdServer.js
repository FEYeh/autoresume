var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var path = require('path');
var colors = require('colors');

var app = new Koa();

const PORT = 8080;

app.use(require('koa-static')(path.join(__dirname, '../build')));

app.use(views(path.join(__dirname, '../build'), {
    extension: 'html'
}));

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


console.log(`---------------------------\n\n正在监听本地端口${PORT}\n\n----------------------------`.red);


app.listen(PORT);