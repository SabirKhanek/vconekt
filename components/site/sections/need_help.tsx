'use client';
import { HTMLProps, useRef } from 'react';
import { Button } from '@/components/site/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion, useInView } from 'framer-motion';
import { Bot3D } from '@/components/site/bot';
import Link from 'next/link';
export function NeedHelp({ ...props }: HTMLProps<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  useGSAP(() => {
    new SplitType('#how_can_we_text', {
      types: ['chars', 'words'],
      charClass: 'how_can_we_text_letter',
      wordClass: 'break-none'
    });
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to('.type_cursor', { opacity: 0.2, duration: 0.5 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#need_help',
        start: '25% center',
        end: '25% top',
        toggleActions: 'play reverse play reverse'
      }
    });

    // tl.to('#robot_avatar', {
    //   top: 0,
    //   duration: 1,
    //   ease: 'bounce.out'
    // });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.how_can_we_text_letter',
      { display: 'none' },
      {
        display: 'inline-block',
        duration: 0.01,
        stagger: 0.04
      }
    );
  }, [isInView]);
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...(props as any)}
      className={` relative z-[2] min-h-screen w-full justify-start bg-transparent  text-white md:h-screen ${'responsive'}`}
    >
      <div className="flex h-full flex-col justify-between py-[10vh]">
        <div className="mb-2 flex w-full flex-col justify-between gap-2 md:flex-row">
          <div className="shrink-0 items-center md:basis-1/2">
            <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
              Need Help?
            </span>
            <div className="my-3 w-[80%]">
              <h2
                id="how_can_we_text"
                className=" inline font-orbit text-4xl font-semibold md:text-5xl "
              >
                <span className="break-none">How may we serve</span>
                {'  '}
                <span className="text-primary">you</span> best?
              </h2>
              <span className="type_cursor how_can_we_text_letter ml-2 inline-block h-9 w-0.5 bg-primary"></span>
            </div>
            <p className="max-w-96 font-light text-white">
              Dedicated experts crafting top-tier solutions, enhancing your
              experience with excellence.
            </p>
          </div>
          <div className="shrink-0 md:basis-96">
            <p className="font-light">
              Step into the realm of VconektLLC, where our expert team crafts
              personalized IT solutions to match your business needs. Embracing
              the ever-evolving landscape of innovation, we curate
              forward-thinking strategies that redefine industry standards.
              We're here to support you every step of the way, ensuring your
              experience with us is smooth and successful.
            </p>
          </div>
        </div>
        <div className="pointer-events-none relative flex flex-col items-center justify-between gap-y-3 rounded-3xl border-2 border-white/65 px-6 py-9 md:flex-row">
          <div className="absolute -top-[244px] left-1/2 hidden h-[244px] w-full -translate-x-1/2 overflow-hidden md:block">
            <Bot3D scale={1.5} />
          </div>
          <p className="small-heading shrink-0 basis-3/4 font-orbit text-4xl font-semibold uppercase">
            We stand ready to assist you in one click.
          </p>
          <Link href="/contact-us">
            <Button
              bg="gradient"
              className="pointer-events-auto self-start md:self-auto"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
