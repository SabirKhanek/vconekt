import { getServiceBySlug } from '@/shared/service-data';
import { Metadata, ResolvingMetadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata(
  {
    params
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const service = getServiceBySlug(slug as string);

  return {
    title: service?.meta_title,
    description: service?.meta_description,
    robots: 'index, follow',
    alternates: {
      canonical: `https://vconekt.com/services/${slug}`
    }
  };
}

export default function ServiceLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
