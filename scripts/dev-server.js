const path = require('path');
const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

app.use(
  devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
  }),
);

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3001, () => {
  console.log('Dev server listening at http://localhost:3001/');
});
