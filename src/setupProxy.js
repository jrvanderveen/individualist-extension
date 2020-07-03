const { createProxyMiddleware } = require("http-proxy-middleware");
/*
This is used for easier testing of the extension through a browser
*/
module.exports = function (app) {
    app.use(
        "/api/v1.1/login/",
        createProxyMiddleware({
            target: process.env.REACT_APP_DEV_API_APP_URL,
            secure: false,
            changeOrigin: true,
        })
    );
    app.use(
        "/webapp/.*",
        createProxyMiddleware({
            target: process.env.REACT_APP_DEV_API_SCRAPER_URL,
            changeOrigin: true,
        })
    );
};
