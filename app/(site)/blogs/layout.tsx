import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `VConekt Blog | Insights & Strategies for Business Growth`,
  description: `Explore the VConekt Blog for expert insights and actionable strategies to fuel business growth. Discover the latest trends in SEO, web design, digital transformation, and more.`,
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.vconekt.com/blogs'
  }
};

export default function BlogsLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
