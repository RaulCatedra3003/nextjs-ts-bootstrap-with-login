/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.softzone.es',
      },
    ],
    minimumCacheTTL:1500000
  },
}

module.exports = nextConfig
