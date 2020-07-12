const http = require('http');
const app = require('../build/server/server');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configClient = require('../configs/webpack.client');
const clientPort = process.env.FE_PORT || 3001;
const clientConfig = configClient({
    port: clientPort,
});
const clientCompiler = webpack(clientConfig);

clientConfig.entry.client.unshift(`webpack-dev-server/client?http://0.0.0.0:${clientPort}/`, 'webpack/hot/only-dev-server');
console.log('Starting webpack');
webpackDevServer = new WebpackDevServer(
    clientCompiler,
    Object.assign(clientConfig.devServer || {}, {
        disableHostCheck: true,
        clientLogLevel: 'info',
        hot: true,
        hotOnly: true,
        noInfo: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        },
    })
);

webpackDevServer.listen(clientPort, '0.0.0.0', () => {
    console.log('webpack-dev-server started on http://0.0.0.0:' + clientPort);
});

function sseMiddleware(req, res, next) {
    log('Received SSE connection');
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    sseConnections.push(res);
}

const { default: expressapp, start: mountApp } = app;
const port = process.env.BE_PORT ? parseInt(process.env.BE_PORT, 10) : 3000;

const server = http.createServer();
server.listen(port);

expressAppRef = expressapp;
mountApp([{
    route: '/devstream',
    when: 'pre',
    middleWare: sseMiddleware,
}]);

server.on('request', expressapp);

