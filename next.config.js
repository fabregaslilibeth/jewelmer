/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jewelmer.com',
        pathname: '/cdn/shop/**',
      },
    ],
  },
}

module.exports = nextConfig 