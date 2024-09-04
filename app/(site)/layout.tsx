import { ReactNode } from 'react';

import { Metadata } from 'next';

import SiteLayout from './layoutContents';
// export const metadata: Metadata = {
//   title: 'VConect LLC',
//   description: ''
// };

export const metadata: Metadata = {
  title: 'VConekt | Best-in-Class IT Solutions for Businesses Globally',
  description:
    'VConekt empowers businesses with comprehensive IT solutions. We deliver custom web & app development, SEO, AI, graphic design, UI/UX, SMM, SEM, and Unity game development. Grow with us! ',
  other: {
    'google-site-verification': 'ukpQKHpukZTxpOGv-LdCvWGfXeOW7tVQbGMYxj2Z3ZY'
  }
};

export default function SiteLayoutWrapper({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
