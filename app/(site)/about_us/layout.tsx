import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Learn About Us and Our Expertise | VConekt LLC',
  description: `VConekt crafts strategic web & app design, development, SEO, and digital transformation to propel your business. Learn why we're different.`
};

export default function AboutUsLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
