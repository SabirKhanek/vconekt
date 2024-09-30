import { ReactNode } from 'react';

import { Metadata } from 'next';

import SiteLayout from './layoutContents';
// export const metadata: Metadata = {
//   title: 'VConect LLC',
//   description: ''
// };

export const metadata: Metadata = {
  title: 'VConekt | Digital Marketing Agency | Web & App Development Agency ',
  description:
    'VConekt is your all-in-one digital marketing agency offering comprehensive services including web and mobile app development, SEO, PPC, SMM, AI solutions, graphic design, and Unity game development.',
  other: {
    'google-site-verification': 'ukpQKHpukZTxpOGv-LdCvWGfXeOW7tVQbGMYxj2Z3ZY'
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://vconekt.com'
  }
};

export default function SiteLayoutWrapper({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
