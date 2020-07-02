//使用nodejs自带的http、https模块
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const ctx = require('async');
const app = new koa();

app.on('error', (error, ctx) => {
    console.log('something error ' + JSON.stringify(ctx.onerror));
});

app.use(ctx => {
    ctx.body = `This is ${ctx.protocol} visit`;
});

//根据项目的路径导入生成的证书文件
const privateKey  = fs.readFileSync(path.join(__dirname, './certificate/server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certificate/server.crt'), 'utf8');
const credentials = {key: privateKey, cert: certificate};

//创建http与HTTPS服务器
const httpServer = http.createServer(app.callback());
const httpsServer = https.createServer(credentials, app.callback());

//可以分别设置http、https的访问端口号
const PORT = 8000;
const SSLPORT = 8001;

//创建http服务器
httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

//创建https服务器
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
