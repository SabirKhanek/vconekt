import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `VConekt Contact Us | Let's Talk About Your Business Growth`,
  description: `Ready to unlock your business potential? Contact VConekt today! We're passionate about crafting custom IT solutions to fuel your success. Get in touch!`
};

export default function ContactUsLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
