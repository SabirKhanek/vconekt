import { ReactNode } from 'react';

import { Metadata } from 'next';

import SiteLayout from './layoutContents';
// export const metadata: Metadata = {
//   title: 'VConect LLC',
//   description: ''
// };

export const metadata: Metadata = {
  title: 'Vconekt LLC',
  description: 'Get your dream projects built with the help of Vconekt Wizards',
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
