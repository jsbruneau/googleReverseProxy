var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', function(proxyRes, req, res, options) {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'https://www.google.com';
    delete proxyRes.headers['x-frame-options'];
});

var server = http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: 'https://www.google.com',
    secure: false,
    autoRewrite: true,
    changeOrigin: true,
  });
});

console.log("listening on port 8080")
server.listen(8080);