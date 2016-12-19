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
            ]
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name]-[chunkhash].js',
            chunkFilename: '[id].[name].chunk.js',
            publicPath: '/',
        },
        plugins: [
            new webpack.DefinePlugin({"process.env": {
                NODE_ENV: JSON.stringify("production"),
            }}),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false},
                sourceMap: false,
            }),
            new HtmlWebpackPlugin({
                template: 'index-template.html',
                filename:'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
            }),
        ],
        devtool: 'source-map',
        debug: false,
        module: {
            loaders: [
                {
                    test: /\.js(x)?$/,
                    loaders: ['babel-loader?plugins=transform-runtime'],
                    exclude: [/node_modules/],
                    include: [
                        path.join(__dirname,'/app'),
                    ],
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                { 
                    test: /\.(css)(\?.*)?$/,
                    loaders: ['style','css?minimize','autoprefixer?browsers=last 2 versions','stylus'],
                },
                { 
                    test: /\.(styl)(\?.*)?$/,
                    loaders: ['style','css?minimize&camelCase','autoprefixer?browsers=last 2 versions','stylus']
                },
                { test: /\.woff2*(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=image/svg+xml" },
            ],
        },
        resolve: {
            extensions: [ '', '.js', '.jsx' ],
            alias:{
                app: path.join(__dirname,'/app'),
            },
            modulesDirectories: [
                'node_modules',
            ],
        },
    };
};

module.exports = config;
