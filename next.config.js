const withTypescript = require('@zeit/next-typescript')
const withTM = require('next-plugin-transpile-modules')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

module.exports = withTM(
  withImages(
    withTypescript(
      withCSS({
        transpileModules: ['@dailybruin/lux'],
        cssModules: true,
      })
    )
  )
)
