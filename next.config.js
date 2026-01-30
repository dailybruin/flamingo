/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    disableStaticImages: false,
    domains: [
      "wp.dailybruin.com",
      "dailybruin.com",
      "secure.gravatar.com",
      "gravatar.com",
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
    ],
    formats: ["image/webp"],
  },
  output: "standalone",
};

module.exports = nextConfig;
