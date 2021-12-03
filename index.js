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


// var httpProxy = require('http-proxy');
// var proxy = httpProxy.createServer({
//     target: {
//       host: 'localhost',
//       port: 4010
//     },
//     prependPath
//     // ssl: {
//     //   key: fs.readFileSync('valid-ssl-key.pem', 'utf8'),
//     //   cert: fs.readFileSync('valid-ssl-cert.pem', 'utf8')
//     // }

//   }).listen(12111);