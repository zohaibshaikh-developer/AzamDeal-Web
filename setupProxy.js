// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://api.example.com',
//       changeOrigin: true,
//     })
//   );
// };

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://azamdeal.com', // Replace with the base URL of your target server
//       changeOrigin: true,
//       secure: false,
//       headers: {
//         'Access-Control-Allow-Origin': 'http://localhost:3000',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//         'Access-Control-Allow-Headers': 'Content-Type',
//       },
//     })
//   );
// };

