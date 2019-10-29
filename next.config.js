const withTM = require("next-plugin-transpile-modules");
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

module.exports =
  withImages(
    withCSS({
        cssModules: true
    })
);
