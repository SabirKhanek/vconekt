/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vconekt.com',
  generateRobotsTxt: true,
  exclude: ['/dashboard/*', '/auth', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://vconekt.com/server-sitemap.xml' // We'll create this dynamic sitemap later
    ]
  },
  generateIndexSitemap: false, // We'll handle this manually for scalability
  outDir: 'public'
};
