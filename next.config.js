const withImages = require("next-images");

module.exports = withImages({
  swcMinify: true, // Enable SWC-based minification
  images: {
    disableStaticImages: true,
    domains: [
      "wp.dailybruin.com",
      "dailybruin.com",
      "secure.gravatar.com",
      "gravatar.com",
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
    ],
  },
  output: 'standalone'
});
