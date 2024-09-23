/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: {
      allowedOrigins: ['vconekt.com']
    }
  },
  async redirects() {
    return [
      {
        source: 'http://vconekt.com/:path*',
        destination: 'https://www.vconekt.com/:path*',
        permanent: true
      },
      {
        source: 'https://vconekt.com',
        destination: 'https://www.vconekt.com',
        permanent: true
      },
      {
        source: 'https://vconekt.com/',
        destination: 'https://www.vconekt.com/',
        permanent: true
      },
      {
        source: 'https://vconekt.com/:path*',
        destination: 'https://www.vconekt.com/:path*',
        permanent: true
      },
      {
        source: 'https://vconekt.com/projects/:subpath*',
        destination: 'https://www.vconekt.com/projects/:subpath*',
        permanent: true
      },
      // New specific redirects
      {
        source: '/services/artificial intelligence',
        destination: 'https://www.vconekt.com/services/artificial-intelligence',
        permanent: true
      },
      {
        source: '/services/mobile_app_dev',
        destination: 'https://www.vconekt.com/services/mobile-app-dev',
        permanent: true
      },
      {
        source: '/services/ui_ux',
        destination: 'https://www.vconekt.com/services/ui-ux-graphic-design',
        permanent: true
      },
      {
        source: '/services/web_design_and_development',
        destination: 'https://www.vconekt.com/services/website-development',
        permanent: true
      },
      {
        source: '/www.website.com',
        destination: 'https://www.vconekt.com',
        permanent: true
      },
      {
        source: 'https://vconekt.com/www.website.com',
        destination: 'https://www.vconekt.com',
        permanent: true
      },
      {
        source: 'https://www.vconekt.com/www.website.com',
        destination: 'https://www.vconekt.com',
        permanent: true
      },
      {
        source: '/:path*',
        destination: 'https://www.vconekt.com',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
