/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // keep minification
  images: {
    domains: ["wp.dailybruin.com"], // whitelist your WordPress CDN
  },
};

module.exports = nextConfig;
