/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.dailybruin.com",
      },
      {
        protocol: "https",
        hostname: "dailybruin.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "*.gravatar.com",
      },
    ],
  },
  output: "standalone",
  // TODO: Remove this once pre-existing ESLint errors in master are fixed
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
