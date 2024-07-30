'use client';
import { HTMLProps } from 'react';
import { Button } from '@/components/site/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Link from 'next/link';

export function Hero({ ...props }: HTMLProps<HTMLElement>) {
  useGSAP(() => {
    const tl = gsap.timeline();
    new SplitType('#hero_subtext', {
      types: ['chars', 'words'],
      charClass: 'subtext_char'
    });
    tl.fromTo(
      '.hero_text',
      {
        rotateZ: -10
      },
      {
        rotate: '0deg',
        duration: 1,
        stagger: 0.1
      }
    ).fromTo('.subtext_char', { opacity: 0 }, { opacity: 1, stagger: 0.02 });
  }, []);

  return (
    <section
      {...props}
      className={`relative z-10 h-[100vh] w-full ${'responsive'}`}
    >
      <div className="relative flex h-screen items-center justify-between">
        <div className="max-w-lg">
          <h2 className="flex flex-col font-orbit   text-4xl font-semibold text-white xs:text-5xl">
            <span className="inline-block overflow-hidden py-1">
              <span className="hero_text">Transform Your</span>
            </span>{' '}
            <span className="inline-block overflow-hidden py-1">
              <span className="hero_text">Business With</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero_text">Next-Generation</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="hero_text">Tech Solutions</span>
            </span>{' '}
          </h2>
          <p
            id="hero_subtext"
            className="hero_subtext my-5 w-full max-w-lg break-normal border-l-4 border-primary pl-2 font-medium text-primary"
          >
            Step into the future of technology with Vconekt LLC, your gateway to{' '}
            <span className="font-medium">
              IT consulting for digital transformation
            </span>
          </p>
          <div className="pointer-events-auto flex items-center gap-4 text-[12px] 384:text-sm xs:text-base">
            <Link href="/services">
              <Button>
                <span className="font-orbit">Discover More</span>
              </Button>
            </Link>
            <Link href={'/contact-us'}>
              <Button bg="grey">
                <span className="font-orbit">Contact Us</span>
              </Button>
            </Link>
          </div>
        </div>
        <span
          onClick={() => {
            const ele = document.getElementById('about_us');
            if (ele) smoothScrollToBottom(ele, 2000);
          }}
          className="absolute bottom-[25vh] right-0 hidden -translate-y-1/2 translate-x-1/2 -rotate-90 cursor-pointer items-center gap-1 self-end sm:flex"
        >
          <svg
            className="inline rotate-90"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.43301 13.25C8.24056 13.5833 7.75944 13.5833 7.56699 13.25L0.638783 1.25C0.446334 0.916667 0.686896 0.500001 1.0718 0.500001L14.9282 0.5C15.3131 0.5 15.5537 0.916667 15.3612 1.25L8.43301 13.25Z"
              fill="#B2E161"
            />
          </svg>
          <span className="break-keep font-orbit text-primary">
            Scroll&nbsp;Down
          </span>
        </span>
      </div>
    </section>
  );
}

function smoothScrollToBottom(element: HTMLElement, duration: number): void {
  const targetPosition: number =
    element.offsetTop +
    element.offsetHeight -
    document.documentElement.clientHeight;
  const startPosition: number = window.pageYOffset;
  const distance: number = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed: number = currentTime - startTime;
    const scrollAmount: number = Math.floor(
      easeInOutQuad(timeElapsed, startPosition, distance, duration)
    );
    window.scrollTo(0, scrollAmount);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
