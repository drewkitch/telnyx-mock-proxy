const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 12111;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:4010";

// Logging
app.use(morgan('combined'));

// Proxy endpoints
const proxyMiddleware = createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/v2/`]: '/',
    },
    logLevel: 'debug'
});

app.use('', proxyMiddleware);

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
