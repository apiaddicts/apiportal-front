const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/mule-proxy',
    createProxyMiddleware({
      target: 'https://eu1.anypoint.mulesoft.com',
      changeOrigin: true,
      pathRewrite: {
        '^/mule-proxy': '',
      },
    })
  );
};
