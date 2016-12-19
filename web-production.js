const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const port = (process.env.PORT || 4000);
console.info('building...');

const webpackConfig = require('./webpack.config.production')();
webpack(webpackConfig).run(function(error,stats){
    console.info('build done');

    if (error){
        console.error('buid->',error)
    }

    app.listen(port, '0.0.0.0', function() {
        console.log('Listening at 0.0.0.0:'+port);
    });
});
