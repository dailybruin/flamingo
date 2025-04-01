const withImages = require("next-images");

module.exports = withImages({
  swcMinify: true, // Enable SWC-based minification
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.dailybruin.com',
      },
    ],
  },
});
