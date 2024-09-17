'use client';
import { HTMLProps, useRef } from 'react';
import { ServiceType, getServiceBySlug } from '@/shared/service-data';
import { V3dContactUs } from '@/components/site/3dLogoInContactUs';
import { Button } from '@/components/site/button';
import { motion, useInView } from 'framer-motion';
import { AboutUsVideo } from '@/components/site/about_us_video';
import { RecentWork } from '@/components/site/sections/recent_work';
import Testimonial from '@/components/site/sections/testimonial';
import { ContactUs } from '@/components/site/sections/contact_us';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

export default function IndividualServicePage() {
  const slug = useParams()?.['slug'] ?? '';
  const navigate = useRouter().push;
  if (!slug) return;
  const service = getServiceBySlug(slug as string);
  if (!service) {
    navigate('/');
    return;
  }
  return (
    <div className="relative z-[2]">
      <Head>
        {service.meta_title && (
          <meta name="title" content={service.meta_title} />
        )}
        {service.meta_description && (
          <meta name="title" content={service.meta_description} />
        )}
      </Head>
      <HeroSection {...service} />
      <WhatIsSection {...service} />
      <WhatIsIncludedSection {...service} />
      <div className="relative z-10 my-20">
        <AboutUsVideo src={service.video} />
      </div>
      <RecentWork />
      <Testimonial />
      <ContactUs />
    </div>
  );
}

function HeroSection({ title, Illustration, slug }: ServiceType) {
  return (
    <div className="responsive hero relative flex items-center justify-between gap-4 pb-24 pt-40">
      <div className="relative z-10 flex flex-1 grow flex-col  justify-center gap-4">
        <h2 className="heading">
          {title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">{title.split(' ').slice(-1)[0]}</span>
        </h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            href={'/'}
            className="cursor-pointer text-primary hover:underline"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link
            href={'/services'}
            className="cursor-pointer text-primary hover:underline"
          >
            Services
          </Link>
          <span className="text-primary">/</span>
          <Link
            href={`/services/${slug}`}
            className="cursor-pointer  hover:underline"
          >
            {title}
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <Illustration
          className="pointer-events-none !h-auto !w-full max-w-lg"
          alt=""
        />
      </div>
    </div>
  );
}

function WhatIsSection({ what_is_content }: ServiceType) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.section
      ref={ref}
      animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
      className="responsive grid grid-cols-[1.4fr_2fr] gap-5"
    >
      <div className="relative">
        <V3dContactUs scale={1} />
      </div>

      <div className="responsive relative z-[2]">
        <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
          What is {what_is_content.tag}
        </span>
        <h2 className="heading py-3">
          {what_is_content.heading.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-primary">
            {what_is_content.heading.split(' ').slice(-1)[0]}
          </span>
        </h2>
        <p className=" py-3 font-light">{what_is_content.body}</p>
        <Link href={'/contact-us'}>
          <Button>
            <span className="text-sm">Let's Connect</span>
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}

function WhatIsIncludedSection({ what_is_included, title }: ServiceType) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.section
      ref={ref}
      animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
      className="responsive my-10"
    >
      <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
        What is included?
      </span>
      <h2 className="heading my-3">
        Benefits of {title.split(' ').slice(0, -1).join(' ')}{' '}
        <span className="text-primary">{title.split(' ').slice(-1)[0]}</span>
      </h2>
      <div className="my-10 grid grid-cols-3 gap-10">
        {what_is_included.map((v, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8, y: -20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.3, delay: 0.3 * i }
              }}
              key={i}
              className="flex items-start gap-3"
            >
              <span className="font-orbit font-semibold text-primary">
                0{i + 1}
              </span>
              <div>
                <h1 className="font-orbit  font-semibold">{v.heading}</h1>
                <p className="text-sm font-light">{v.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
