const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = function({hot, env} = {hot: false,}){
    return {
        target: 'web',
        entry: {
            app: [
                'babel-polyfill',
                path.join(__dirname, '/app/index.js'),
            ],
            tests: [
                'babel-polyfill',
                'mocha!/'+ path.join(__dirname, '/tests/index.js'),
            ],
        },
        output: {
            path: path.join(__dirname),
            filename: '[name].js',
            chunkFilename: '[id].[name].chunk.js',
            publicPath: '/',
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin('vendors.js'),
            new HtmlWebpackPlugin({
                template: 'index-template.html',
                filename: 'index.html',
                excludeChunks: ['tests'],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
            }),
        ],
        devtool: 'source-map',
        debug: true,
        module: {
            loaders: [
                {
                    test: /\.js(x)?$/,
                    loaders: (hot ? ['react-hot'] : []).concat(['babel-loader?plugins=transform-runtime']),
                    exclude: [/node_modules/],
                    include: [
                        path.join(__dirname,'/app'),
                        path.join(__dirname,'/tests'),
                    ],
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /sinon.*\.js$/,
                    loader: 'imports?define=>false,require=>false',
                },
                { 
                    test: /\.(css)(\?.*)?$/,
                    loaders: ['style','css','autoprefixer?browsers=last 2 versions'],
                },
                { 
                    test: /\.(styl)(\?.*)?$/,
                    loaders: ['style','css?camelCase&localIdentName=[local]---[hash:base64:2]','autoprefixer?browsers=last 2 versions','stylus'],
                },
                { test: /\.woff2*(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=image/svg+xml" },
            ],
            noParse: [
                /\.min\.js/,
                /node_modules\/sinon\//,
            ],
        },
        resolve: {
            extensions: [ '', '.js', '.jsx' ],
            alias:{
                app: path.join(__dirname,'/app'),
                bootstrap: path.join(__dirname,'/bootstrap'),
                sinon: 'sinon/pkg/sinon',
            },
            modulesDirectories: [
                'node_modules',
            ],
        },
    };
};

module.exports = config;
