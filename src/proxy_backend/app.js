const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

// Add middleware for http proxying 
app.use('/_api', proxy({
    target: 'http://localhost:3001', 
    changeOrigin: true,
    pathRewrite: {
        '^/_api' : '/'
    }
}));


app.use('/', proxy({
    target: 'http://localhost:3002', 
    changeOrigin: true,
    pathRewrite: {
        '^/app' : '/'
    }
}));

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});