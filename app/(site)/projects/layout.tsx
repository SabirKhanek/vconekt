import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `VConekt Projects | Showcasing Innovation & Success Stories`,
  description: `Explore VConekt's transformative projects! We craft cutting-edge web, app, and digital solutions that drive real results for businesses. Get inspired today!`,
  robots: 'index, follow',
  alternates: {
    canonical: 'https://vconekt.com/projects'
  }
};

export default function ProjectsLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
