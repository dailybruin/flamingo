const withImages = require("next-images");

module.exports = withImages({
  swcMinify: true, // Enable SWC-based minification
  images: {
    domains: ['wp.dailybruin.com'],
    disableStaticImages: true,
  },
});
