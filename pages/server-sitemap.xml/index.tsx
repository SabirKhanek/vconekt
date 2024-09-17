import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getBlogs } from '@/app/actions/blogs';
import { getProjects } from '@/app/actions/projects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const blogs = await getBlogs();
  const projects = await getProjects();

  const blogFields = blogs.map((blog) => ({
    loc: `https://vconekt.com/${blog.slug}`,
    lastmod: blog.updated_at
      ? new Date(blog.updated_at).toISOString()
      : new Date().toISOString()
  }));

  const projectFields = projects.map((project) => ({
    loc: `https://vconekt.com/projects/${project.slug}`,
    lastmod: new Date().toISOString()
  }));

  const fields = [...blogFields, ...projectFields];

  // Use a type assertion for the ctx parameter
  const { res } = ctx;
  const sitemapResponse = await getServerSideSitemap(ctx as any, fields);

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemapResponse);
  res.end();

  return {
    props: {}
  };
};

// Default export to prevent next.js errors
export default function Sitemap() {}
