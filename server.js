/*eslint no-console:0 */
require('core-js/fn/object/assign');
//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('./webpack.config');
//var open = require('open');
//
//new WebpackDevServer(webpack(config), config.devServer)
//.listen(config.port, 'localhost', function(err) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Listening at localhost:' + config.port);
//  console.log('Opening your system browser...');
//  open('http://localhost:' + config.port + '/webpack-dev-server/');
//});

const http = require('http');
const express = require('express');
const path = require('path');
const open = require('open');

// Create the app, setup the webpack middleware
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, webpackConfig.devServer));
  app.use(require('webpack-hot-middleware')(compiler));

  // You probably have other paths here
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist/')));
}

const server = new http.Server(app);
const io = require('socket.io')(server);

require('./controllers/base')(io);

const PORT = process.env.PORT || webpackConfig.port;

server.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + PORT);
});
