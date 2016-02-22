/*eslint no-console:0 */
require('core-js/fn/object/assign');
const http = require('http');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

// Create the app, setup the webpack middleware
const app = express();
app.use(favicon(path.join(__dirname, './favicon.ico')));

// You probably have other paths here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});


if (process.env.NODE_ENV !== 'production') {
  console.log('Loading webpack...');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, webpackConfig.devServer));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  console.log('Serving Static...');
  app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
}

const server = new http.Server(app);
const io = require('socket.io')(server);

require('./controllers/base')(io);

const PORT = process.env.PORT || webpackConfig.port;

server.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + PORT);
});
