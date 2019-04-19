const withTypescript = require('@zeit/next-typescript');
const withTM = require('next-plugin-transpile-modules');
const withImages = require('next-images')

module.exports = withImages(withTypescript(
  withTM({
    transpileModules: ['@dailybruin/lux']
  }))
);
