const nextConfig = {
  experimental: {
    optimizeCss: false, // disables Lightning CSS
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [], // leave empty, use remotePatterns for all
  },
};

module.exports = nextConfig;
