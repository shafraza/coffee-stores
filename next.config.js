// /** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  experiments: {
    topLevelAwait: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  }
  
}
