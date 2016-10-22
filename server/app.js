import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const config = require('../webpack.config.js');
config.entry.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  publicPath: config.output.publicPath,
  contentBase: 'dist',
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: true,
    modules: false,
  }
});

server.listen(8080);
