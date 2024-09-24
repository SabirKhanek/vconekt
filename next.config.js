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
            value: 'www.vconekt.com'
          }
        ],
        destination: 'https://vconekt.com/:path*',
        permanent: true
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vconekt.com'
          }
        ],
        destination: 'https://vconekt.com/:path*',
        permanent: true
      },
      // Keep your existing service-specific redirects
      {
        source: '/services/artificial intelligence',
        destination: 'https://vconekt.com/services/artificial-intelligence',
        permanent: true
      },
      {
        source: '/services/mobile_app_dev',
        destination: 'https://vconekt.com/services/mobile-app-dev',
        permanent: true
      },
      {
        source: '/services/ui_ux',
        destination: 'https://vconekt.com/services/ui-ux-graphic-design',
        permanent: true
      },
      {
        source: '/services/web_design_and_development',
        destination: 'https://vconekt.com/services/website-development',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
