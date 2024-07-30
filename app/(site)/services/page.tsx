'use client';
import { ServiceType, services } from '@/shared/service-data';
import { Button } from '@/components/site/button';
import { useRef } from 'react';
import { ReactRef, useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ContactUs } from '@/components/site/sections/contact_us';
import Testimonial from '@/components/site/sections/testimonial';
import Link from 'next/link';
import { AnimatedList } from '@/components/site/animatedList';
import Head from 'next/head';

export default function ServicesPage() {
  return (
    <>
      <div className="relative z-10 flex flex-col  items-center justify-center gap-4 pb-24 pt-40 text-white">
        <Head>
          <meta
            name="title"
            content="VConekt | Full-Scale IT Solutions | Web & App Dev, SEO, AI & More"
          />
          <meta
            name="description"
            content="VConekt empowers businesses with comprehensive IT solutions. We deliver custom web & app development, SEO, AI, graphic design, UI/UX, SMM, SEM, and Unity game development. Grow with us!"
          />
        </Head>
        <h2 className="heading uppercase ">Services</h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            href={'/'}
            className="cursor-pointer text-primary hover:underline"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link href={'/about-us'} className="cursor-pointer hover:underline">
            Services
          </Link>
        </div>
        <div className="responsive relative z-[2] pt-36 lm:py-9">
          <div className="relative z-10">
            <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
              Our Services
            </span>
            <h2 className="heading mt-3 max-w-4xl">
              Empower Your Digital Future with Proactive IT maintenance services
              at <span className="text-primary">Vconekt LLC</span>.
            </h2>
          </div>

          {/* <V3dContactUs scale={1} /> */}
        </div>
      </div>
      <Services />
      <Testimonial />

      <ContactUs />
    </>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const container = ref.current;
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `-${document.documentElement.clientHeight / 2} center`,
        endTrigger: container,
        end: `+${document.documentElement.clientHeight * 2} bottom`,
        snap: { snapTo: 1, duration: 1, ease: 'linear' }
      }
    });
  }, []);
  return (
    <div
      ref={ref}
      style={{ height: `${services.length * 180 + 20}vh` }}
      className="relative z-[2] overflow-hidden"
    >
      {services.map((service, index) => (
        <Service
          parentRef={ref}
          isLast={index === services.length - 1}
          key={index}
          index={index}
          {...service}
        ></Service>
      ))}
    </div>
  );
}

function Service({
  title,
  description,
  highlights,
  slug,
  Illustration,
  index,
  isLast = false,
  parentRef
}: ServiceType & { index: number; isLast?: boolean; parentRef: ReactRef }) {
  const isEven = (index + 1) % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const animation = () => {
    const container = ref.current;
    if (!container) return;
    const content = container.children[0];

    const ftl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        pinnedContainer: content,
        pin: true,
        endTrigger: isLast ? parentRef.current : container,
        end: isLast ? 'bottom bottom' : 'center top',
        pinSpacing: false,
        snap: { snapTo: 1, duration: 1, ease: 'linear' },
        scrub: true
      }
    });

    if (isLast) {
      ftl.fromTo(
        content,
        {
          x: document.documentElement.clientWidth + 550,
          y: -content.clientHeight - 1,
          transform: 'perspective(500px) rotateY(5deg)',
          z: -500
        },
        {
          x: 0,
          y: (document.documentElement.clientHeight - content.clientHeight) / 2,
          transform: 'perspective(500px) rotateY(0)',
          z: 0
        }
      );
      return;
    }

    const stl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: '+1vh top',
        pinnedContainer: content,
        pin: true,
        pinSpacing: false,
        snap: { snapTo: 0.9, duration: 1, ease: 'linear' },
        endTrigger: container,
        end: 'bottom top',
        scrub: true
      }
    });

    ftl.fromTo(
      content,
      {
        y: -content.clientHeight - 370,
        top: 0,
        z: -1000,
        transform: 'perspective(1000px)',
        rotatey: '-15deg'
      },
      {
        y: (document.documentElement.clientHeight - content.clientHeight) / 2,
        top: '50vh',
        z: 0,
        transform: 'perspective(1000px)',
        rotateY: '0'
      }
    );

    stl.to(content, {
      y: document.documentElement.clientHeight,
      transform: 'perspective(1000px)',
      rotateY: '10deg',
      opacity: 0,
      z: 400,
      x: index % 2 === 0 ? 100 : -100
    });
  };

  useGSAP(animation, { scope: ref, dependencies: [ref] });
  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute h-[200vh] w-full overflow-hidden`}
      id={index === 0 ? 'services' : ''}
      style={{
        top: `${index * 180}vh`,
        height: '200vh',
        zIndex: index
      }}
    >
      <div
        className={`responsive grid grid-cols-1  ${
          isEven ? 'sm:grid-cols-[0.4fr_0.6fr]' : 'sm:grid-cols-[0.6fr_0.4fr]'
        } left-0 top-0 gap-10 `}
      >
        <div className={`flex flex-col gap-5`}>
          <h2 className="heading">
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">
              {title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <p className="font-light">{description}</p>
          <AnimatedList
            listIconSize={20}
            className="flex flex-col gap-2"
            itemClass="gap-2"
            items={highlights}
            textClass="text-base"
          />

          <Link href={`/services/${slug}`}>
            <Button className="pointer-events-auto self-start">
              <span className="px-2 text-sm">Learn More</span>
            </Button>
          </Link>
        </div>
        <div
          className={`flex items-center justify-end ${
            isEven ? '-order-1' : ''
          }`}
        >
          <Illustration className="hidden h-auto max-h-[450] w-full max-w-[450px] sm:block" />
        </div>
      </div>
    </div>
  );
}
