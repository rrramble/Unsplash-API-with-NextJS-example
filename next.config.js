const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "variables.scss";`
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/topic',
      },
    ]
  },
  i18n: {
    locales: ['ru-KZ-Cyrl', 'en-US'],
    defaultLocale: 'ru-KZ-Cyrl',
  },

}

module.exports = nextConfig
