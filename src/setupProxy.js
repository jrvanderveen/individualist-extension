const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/v1.1/login/',
        createProxyMiddleware({
           target: 'http://localhost:5000',
           secure: false,
           changeOrigin: true
        })
      );
      app.use(
        '/webapp/.*',
        createProxyMiddleware({
           target: 'http://localhost:5000',
           changeOrigin: true
        })
      );
};