'use strict';
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config')({hot: true,});

const entryDefault = [
    'webpack-dev-server/client?http://0.0.0.0:4000',
    'webpack/hot/only-dev-server',
];

const newConfig = {
    ...webpackConfig,
    entry: Object.keys(webpackConfig.entry).reduce((r,key) => {
        r[key] = entryDefault.concat(webpackConfig.entry[key] instanceof Array ? webpackConfig.entry[key] : [webpackConfig.entry[key]]);
        return r;
    },{}),
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'cheerio': 'window',
    },
};

const compiler = webpack(newConfig);

const server = new webpackDevServer(compiler, {
    open: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
        colors: true,
        exclude:[/node_modules/],
    },
})

server.listen(4000, '0.0.0.0', function(){
    console.log('web listening at 0.0.0.0:4000');
})
