const withImages = require("next-images");

module.exports = withImages({
  swcMinify: true, // Enable SWC-based minification
  images: {
    disableStaticImages: true,
  },
  webpack5: true  // Enable webpack 5
});
