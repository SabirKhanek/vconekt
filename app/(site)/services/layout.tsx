import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title:
    'VConekt | Full-Scale Digital Services | Web & App Dev, SEO, AI & More',
  description:
    'VConekt empowers businesses with comprehensive digital services. We deliver custom web & app development, SEO, PPC, SMM, AI, graphic design, and Unity game development.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://vconekt.com/services'
  }
};

export default function ServicesLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
