// Override Webpack configurations for running tests over the production Webpack build
const config = require('./webpack.config');
config.output.path = 'test-prod';
config.externals['cloudinary-core'] = 'cloudinary-core';
config.externals['react'] = 'react';

module.exports = config;