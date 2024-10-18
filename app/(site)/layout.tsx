import { ReactNode } from 'react';
import Script from 'next/script';

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
  return (
    <>
      <Script id="organization-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "VConekt",
            "url": "https://vconekt.com",
            "logo": "https://vconekt.com/logo.png",
            "sameAs": [
              "https://www.instagram.com/vconektofficial/",
              "https://www.facebook.com/vconektofficial",
              "https://x.com/vconektofficial",
              "https://www.linkedin.com/company/vconektofficial/"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+13108481237",
              "contactType": "Customer Service",
              "areaServed": ["US", "AL", "KY", "OH", "AK", "LA", "OK", "AZ", "ME", "OR", "AR", "MD", "PA", "AS", "MA", "PR", "CA", "MI", "RI", "CO", "MN", "SC", "CT", "MS", "SD", "DE", "MO", "TN", "DC", "MT", "TX", "FL", "NE", "TT", "GA", "NV", "UT", "GU", "NH", "VT", "HI", "NJ", "VA", "ID", "NM", "VI", "IL", "NY", "WA", "IN", "NC", "WV", "IA", "ND", "WI","KS","MP","WY"],
              "availableLanguage": ["English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "7901 4th St N#19454 St. Pertersburg",
              "addressLocality": "St. Petersburg",
              "addressRegion": "Florida",
              "postalCode": "33702",
              "addressCountry": "USA"
            },
            "department": [
              {
                "@type": "LocalBusiness",
                "name": "USA Office",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "7901 4th St N#19454 St. Petersburg, FL",
                  "addressLocality": "St. Petersburg",
                  "addressRegion": "Florida",
                  "postalCode": "33702",
                  "addressCountry": "USA"
                }
              }
            ]
          }
        `}
      </Script>
      <Script id="website-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "WebSite",
            "name": "VConekt",
            "sameas": "VConekt Development and Marketing Agency",
            "url": "https://vconekt.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vconekt.com{search_term_string}https://vconekt.com",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </Script>
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "VConekt",
              "item": "https://vconekt.com/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Our Services",
              "item": "https://vconekt.com/services"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Trending Insights",
              "item": "https://vconekt.com/blogs"
            },{
              "@type": "ListItem",
              "position": 4,
              "name": "Contact Us",
              "item": "https://vconekt.com/contact-us"
            }]
          }
        `}
      </Script>
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
