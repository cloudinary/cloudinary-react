'use strict';

module.exports = function (api) {
  api.cache.never();
  return {
    plugins: [
      '@babel/proposal-export-default-from',
      '@babel/plugin-proposal-class-properties'
    ],
    presets:
      ['@babel/preset-env', '@babel/preset-react']
  };
};
