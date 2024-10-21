import { ReactNode } from 'react';

export default function ProjectLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  return <>{children}</>;
}
