const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.development.config.js');
const compiler = webpack(config);

//Enable "webpack-dev-middleware"
export const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true, 
    publicPath: config.output.publicPath
});

//Enable "webpack-hot-middleware"
export const hotMiddleware = webpackHotMiddleware(compiler);

 