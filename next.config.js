/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // keep minification
  images: {
    domains: [
      "wp.dailybruin.com",
      "dailybruin.com",
      "gravatar.com",
      "secure.gravatar.com"
    ], // whitelist common image domains used in content/avatars
  },
};

module.exports = nextConfig;
