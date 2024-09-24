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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vconekt.com'
          }
        ],
        destination: 'https://www.vconekt.com/:path*',
        permanent: true
      },
      {
        source: '/projects/:subpath*',
        has: [
          {
            type: 'host',
            value: 'vconekt.com'
          }
        ],
        destination: 'https://www.vconekt.com/projects/:subpath*',
        permanent: true
      },
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
        source: '/:path*',
        destination: 'https://www.vconekt.com',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
