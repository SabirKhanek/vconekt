'use client';
import { V3dContactUs } from '@/components/site/3dLogoInContactUs';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/site/button';
import { GoArrowRight } from 'react-icons/go';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useHover from '@/components/use-hover';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectCard, projects } from './comps';
import Head from 'next/head';

export default function Projects() {
  return (
    <>
      <div className="relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-36 text-white">
        <Head>
          <meta
            name="title"
            content="VConekt Projects | Showcasing Innovation & Success Stories"
          />
          <meta
            name="description"
            content="Explore VConekt's transformative projects! We craft cutting-edge web, app, and digital solutions that drive real results for businesses. Get inspired today!"
          />
        </Head>
        <div className="relative flex h-64 flex-col items-center justify-center">
          <V3dContactUs scale={0.7} />

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <h2 className="heading uppercase ">Projects</h2>
            <div className="flex items-center gap-3 font-orbit font-medium ">
              <Link
                href={'/'}
                className="cursor-pointer text-primary hover:underline"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link
                href={'/about-us'}
                className="cursor-pointer hover:underline"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive relative z-[2]">
        <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
          Projects
        </span>
        <h2 className="heading">
          Explore Our Diverse Portfolio of Success{' '}
          <span className="text-primary">Stories</span>
        </h2>
        <div className="my-3 mb-10 flex flex-col gap-10 520:flex-row">
          {[1, 2].map((v, i) => {
            return (
              <div
                key={v}
                className={`flex flex-1 flex-col gap-10 ${
                  v === 2 ? '520:-translate-y-[75px]' : ''
                }`}
              >
                <ProjectCard project={projects[i % projects.length]} />
                <ProjectCard project={projects[(i + 1) % projects.length]} />
                <ProjectCard project={projects[(i + 2) % projects.length]} />
              </div>
            );
          })}
        </div>
        <hr className="mx-auto my-0 mb-5 h-0.5 max-w-2xl bg-white/30" />
        <div className="my-10 flex items-center justify-center">
          <Button>Load More</Button>
        </div>
      </div>
    </>
  );
}
