const withImages = require("next-images");

module.exports = withImages({
  swcMinify: true, // Enable SWC-based minification
  images: {
    domains: ['wp.dailybruin.com', 'dailybruin.com'],
    disableStaticImages: true,
  },
});
