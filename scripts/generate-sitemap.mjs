import fs from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

const sitemapSize = 5000; // Max number of URLs per sitemap

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/**/*.tsx',
    'app/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/dashboard',
    '!pages/auth'
  ]);

  const sitemaps = [];
  for (let i = 0; i < pages.length; i += sitemapSize) {
    const sitemapPages = pages.slice(i, i + sitemapSize);
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapPages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('app', '')
              .replace('.tsx', '')
              .replace('/index', '');
            const route = path === '/index' ? '' : path;
            return `
              <url>
                <loc>${`https://vconekt.com${route}`}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `;
          })
          .join('')}
      </urlset>
    `;
    const formattedSitemap = await prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html'
    });
    const sitemapPath = `public/sitemap-${i / sitemapSize}.xml`;
    fs.writeFileSync(sitemapPath, formattedSitemap);
    sitemaps.push(sitemapPath);
  }

  const sitemapIndex = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map(
          (sitemap) => `
        <sitemap>
          <loc>https://vconekt.com/${sitemap.replace('public/', '')}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `
        )
        .join('')}
      <sitemap>
        <loc>https://vconekt.com/server-sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>
  `;

  const formattedSitemapIndex = await prettier.format(sitemapIndex, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', formattedSitemapIndex);
}

generateSitemap();
