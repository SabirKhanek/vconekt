'use client';
import React, { HTMLProps, useEffect, useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../button';
export const RecentWork = React.memo(({ ...props }: HTMLProps<HTMLElement>) => {
  const [slideReelTimeline, setSlideReelTimeline] =
    useState<gsap.core.Timeline | null>();

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredReel, setHoveredReel] = useState<number | null>(null);
  //   const [isAnimating, setIsAnimating] = useState(false);
  const reel_container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to('.type_cursor', { opacity: 0.2, duration: 0.5 });
    new SplitType('#service_text', {
      types: 'chars',
      charClass: 'service_text_letter'
    });
    const textTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 1
    });
    textTimeline.fromTo(
      '.service_text_letter',
      { display: 'none' },
      {
        display: 'inline-block',
        duration: 0.01,
        stagger: 0.04
      }
    );

    const reels = document.getElementsByClassName('service_reel_item');
    const reel_container_ref = reel_container.current;
    const slideReelTimeline = gsap.timeline({});
    setSlideReelTimeline(slideReelTimeline);
    slideReelTimeline.to('.service_reel_item', {
      repeat: -1,
      repeatRefresh: true,
      duration: 0.01,
      onRepeatComplete: (reelIndex: number) => {
        const reelContainerLeft = reel_container_ref?.clientLeft;
        // const reelLeft = reels[reelIndex].getBoundingClientRect().left;
        const reelRight = reels[reelIndex].getBoundingClientRect().right;
        const reelContainerRight =
          reelContainerLeft || 0 + (reel_container_ref?.clientWidth || 0);
        const reelWidth = reels[reelIndex].clientWidth;

        const currentPosition = gsap.getProperty(reels[reelIndex], 'x');

        if (reelRight < 0 && reelRight >= -10) {
          gsap.set(reels[reelIndex], {
            x: reelContainerRight - (reelWidth - 15)
          });
        } else {
          gsap.set(reels[reelIndex], { x: (currentPosition as number) - 1 });
        }
      }
    });
  }, [reel_container.current]);

  useGSAP(() => {
    const serviceReelTimeline = gsap.timeline({});
    serviceReelTimeline.fromTo(
      reel_container.current,
      {
        rotateZ: 2,
        y: 30
      },
      {
        rotateZ: -2,
        y: -30,
        scrollTrigger: {
          trigger: ref.current,
          start: '-50% top',
          end: '+50% top',
          scrub: true
        }
      }
    );
  }, [ref.current, reel_container.current]);

  const { contextSafe } = useGSAP(() => {
    if (hoveredReel) {
      if (!slideReelTimeline) {
        console.log(slideReelTimeline, 'not defined');
        return;
      }
      slideReelTimeline.pause();
      const reels = document.getElementsByClassName('service-reel-item-inner');
      const reel = reels[hoveredReel];
      gsap.to(reel, { opacity: 1, rotateY: '0deg', scale: 1.2 });
    }
  }, [hoveredReel]);

  const onHoverReel = (reelNumber: number) => {
    if (hoveredReel !== reelNumber) setHoveredReel(reelNumber);
  };
  const onHoverExit = contextSafe((reelNumber: number) => {
    const reels = document.getElementsByClassName('service-reel-item-inner');
    const reel = reels[reelNumber];
    gsap.to(reel, { opacity: 0.7, rotateY: '15deg', scale: 1 });
    setHoveredReel(null);
    slideReelTimeline?.resume();
  });

  useEffect(() => {
    if (isInView) {
      slideReelTimeline?.play();
    } else {
      slideReelTimeline?.pause();
    }
  }, [isInView]);
  const height = 160;
  const width = height * 1.84;
  return (
    <motion.section
      {...(props as any)}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={` relative z-[2] my-10 w-full justify-start  overflow-hidden bg-transparent text-white`}
    >
      <div
        id={'reel_container'}
        ref={reel_container}
        style={{
          width: (width + 10) * recent_reel.length,
          height: height * 1.3
        }}
        className="absolute top-1/2 z-0 h-[300px] origin-center -translate-y-1/2 overflow-x-hidden overflow-y-visible"
      >
        {recent_reel.map((n, index) => {
          const transformValue = `translateX(${(width + 15) * index}px)`;
          return (
            <div
              style={{
                width,
                transform: transformValue,
                height,
                perspective: 500,
                perspectiveOrigin: 'center',
                position: 'absolute'
              }}
              className="service_reel_item top-5 cursor-pointer overflow-y-visible"
              key={index}
            >
              <div
                style={{
                  transformOrigin: 'center',
                  transform: 'rotateY(15deg)',
                  opacity: 0.7
                }}
                onMouseOver={() => {
                  onHoverReel(index);
                }}
                onMouseLeave={() => {
                  onHoverExit(index);
                }}
                className="service-reel-item-inner absolute h-full border border-white/65 p-1 "
              >
                <a href={n.target} target="_blank">
                  <img
                    src={`/portfolio/${n.src}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`pointer-events-none  relative z-10 flex h-full w-full flex-col items-start  justify-start  ${'responsive'}`}
      >
        <span className="font-orbit rounded-3xl bg-primary/15 px-5 py-2 uppercase text-primary">
          Recent Work
        </span>
        <p className=" heading max-lm:!text-[34px] max-lm:!max-h-full font-orbit my-5 max-w-[80%] text-[5vw] font-semibold !leading-tight">
          Elevate your online presence with our integrated web, marketing, and
          design
          <br />
          <span className="inline-block text-primary " id="service_text">
            services.{' '}
            <span className="type_cursor ml-2 inline-block h-9 w-1 bg-primary"></span>
          </span>
        </p>
        <Link href="/projects">
          <Button className="font-orbit pointer-events-auto">
            View All Portfolio
          </Button>
        </Link>
      </div>
    </motion.section>
  );
});

const recent_reel = [
  { src: '3_monkeys.png', target: '#' },
  { src: 'aaron.png', target: '#' },
  { src: 'activ_on.png', target: '#' },
  { src: 'bank_info.png', target: '#' },
  { src: 'Bath Fitter.png', target: '#' },
  { src: 'boldare.png', target: '#' },
  { src: 'cmmhc.png', target: '#' },
  { src: 'crave_timing_system.png', target: '#' },
  { src: 'dragon_smoke.png', target: '#' },
  { src: 'elite_exterior_cleaning.png', target: '#' },
  { src: 'fast_track.png', target: '#' },
  { src: 'fishing_gun.png', target: '#' },
  { src: 'guitar_instrument.png', target: '#' },
  { src: 'james_whitney_co.png', target: '#' },
  { src: 'malik_opal.png', target: '#' },
  { src: 'marjan.png', target: '#' },
  { src: 'motor_helmets.png', target: '#' },
  { src: 'reca.png', target: '#' },
  { src: 'shisha_n_vape.png', target: '#' },
  { src: 'shisha_shop.png', target: '#' },
  { src: 'smarter_swipe.png', target: '#' },
  { src: 'sports_hub.png', target: '#' },
  { src: 'vconekt.png', target: '#' },
  { src: 'vconekt_store.png', target: '#' },
  { src: 'yulu.png', target: '#' }
];
