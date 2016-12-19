'use strict';

module.exports = function(config) {
    const karmaConfig = require('./karma.config.base')();

    karmaConfig.reporters = ['mocha',];
    karmaConfig.logLevel = config.LOG_INFO,

    config.set(karmaConfig);
};
