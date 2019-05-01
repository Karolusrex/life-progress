const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');

require('dotenv').config({ path: '.env' });

module.exports = {
  mode: 'development',
  cache: true,
  profile: true,
  devtool: 'source-map',
  entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: 'app.js',
    publicPath: '/bundle/',
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { sourceMap: true },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUGGER': JSON.stringify(process.env.DEBUGGER),
    }),
  ],
};
