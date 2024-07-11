'use client';
import dynamic from 'next/dynamic';
import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-particles';
import { Preloader, PreloaderProvider } from '@/components/site/preloader';
import { motion } from 'framer-motion';
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from 'next';
import { Orbitron, Kanit } from 'next/font/google';
const V3d = dynamic(() => import('@/components/site/3dlogo'));
const FluidCursor = dynamic(() => import('@/components/site/fluid-cursor'));
import '@/styles/site.styles.css';
import NavSwitchProvider from '@/components/site/nav-switch';
import { Footer } from '@/components/site/footer';
import { Navbar } from '@/components/site/nav';
import { useGsapRegister } from '@/components/gsap-register-plugins';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/site/button';
// export const metadata: Metadata = {
//   title: 'VConect LLC',
//   description: ''
// };

const orbit = Orbitron({
  variable: '--font-orbit',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

const kanit = Kanit({
  variable: '--font-kanit',
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
});

export default function SiteLayout({
  children
}: {
  children: Readonly<ReactNode>;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (document.readyState !== 'complete') {
      const handler = () => {
        console.log('load');
        setShowSplash(false);
        ScrollTrigger.refresh(true);
      };
      window.addEventListener('load', handler);

      return () => {
        window.removeEventListener('load', handler);
      };
    } else {
      const timeout = window.setTimeout(() => {
        console.log('timeout');
        setShowSplash(false);
      }, 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);
  useEffect(() => {
    console.log('show splash updatd', showSplash);
  }, [showSplash]);
  const particlesInit = useCallback(async (engine: any) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);
  useMemo(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);
    console.log('Registered plugin!');
  }, []);

  useEffect(() => {
    console.log('IN USE EFFECT!');
    // ScrollTrigger.config({})
    const listenerfun = () => {
      console.log('Refreshing scroll trigger listener func');
      ScrollTrigger.refresh(true);
    };
    window.addEventListener('DOMContentLoaded', listenerfun);
    return () => {
      window.removeEventListener('DOMContentLoaded', listenerfun);
    };
  }, []);

  const refreshScrollTrigger = () => {
    console.log('refreshing scroll trigger');
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    let seconds = 0;

    const interval = setInterval(() => {
      if (seconds < 60) {
        refreshScrollTrigger();
        seconds++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    container;
  }, []);
  useGsapRegister();

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <body
        className={`${kanit.variable} ${kanit.className} ${orbit.variable}`}
      >
        <div id="root">
          <NextTopLoader color="#b2e161" />

          <NavSwitchProvider>
            <PreloaderProvider>
              <div className="relative">
                <Particles
                  init={particlesInit}
                  loaded={particlesLoaded}
                  className="relative z-[1]"
                  url="/particles_config.json"
                />
                <FluidCursor className={'pointer-events-none'} />
                <V3d />
                <Preloader />
                <div id="scroll-wrapper" className="z-[5]">
                  <main
                    id="main-container"
                    className="overflow-x-hidden text-white"
                  >
                    <AnimatingSmokeBlobs />
                    <Navbar></Navbar>
                    {children}
                    <Footer></Footer>
                  </main>
                </div>
              </div>
            </PreloaderProvider>
          </NavSwitchProvider>
        </div>
        <div id="mobile-nav"></div>
      </body>
    </html>
  );
}

const AnimatingSmokeBlobs = () => {
  return (
    <>
      <motion.div
        animate={{
          x: ['-12.5vw', '0vw', '-12.5vw'],
          y: ['0vh', '50vh', '0vh'],
          transition: {
            x: {
              duration: 17, // adjust duration as needed
              repeat: Infinity,
              ease: 'easeInOut'
            },
            y: {
              duration: 25, // adjust duration as needed
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        }}
        className="pointer-events-none fixed left-0 h-[25vw] w-[25vw] rounded-full bg-primary opacity-25 blur-[5vw]"
      />
      <motion.div
        animate={{
          x: ['20vw', '10vw', '20vw'],
          y: ['0vh', '40vh', '0vh'],
          transition: {
            x: {
              duration: 25, // adjust duration as needed
              repeat: Infinity,
              ease: 'easeInOut'
            },
            y: {
              duration: 17, // adjust duration as needed
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        }}
        className="pointer-events-none fixed right-0 h-[30vw] w-[30vw] rounded-full bg-primary opacity-25 blur-[8vw]"
      />
    </>
  );
};
