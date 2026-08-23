/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local backend in dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      // Production — update with the real domain once deployed
      {
        protocol: "https",
        hostname: "sisoprasmul.com",
        pathname: "/media/**",
      },
      // Unsplash placeholders
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/articles",
        destination: "/articles-and-achieve",
        permanent: true,
      },
      {
        source: "/articles/:slug*",
        destination: "/articles-and-achieve/:slug*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
