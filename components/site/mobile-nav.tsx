'use client';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { MenuButton } from './menu-button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { navlinks } from './nav';
import { useNavSwitch } from './nav-switch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface MobileNavProps {}

export function MobileNav({ ...props }: MobileNavProps) {
  if (
    typeof document !== 'undefined' &&
    document.getElementById('mobile-nav')
  ) {
    return createPortal(
      <Nav {...props}></Nav>,
      document.getElementById('mobile-nav')!
    );
  } else {
    return <></>;
  }
}

function Nav({ ...props }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nav = useNavSwitch();
  const location = usePathname();
  useEffect(() => {
    if (nav.isNavOpened)
      document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
    else
      document
        .getElementsByTagName('body')[0]
        .classList.remove('overflow-hidden');
  }, [nav.isNavOpened]);

  useGSAP(() => {
    if (!navRef.current) return;
    const tl = gsap.timeline({});

    if (nav.isNavOpened) {
      tl.to(navRef.current, {
        delay: 0.5,
        duration: 0.2,
        top: '0'
      });
      tl.to(buttonRef.current, { duration: 0.1, opacity: 1 });
      tl.to('.mobile_nav_text', {
        opacity: 1,
        duration: 0.2,
        y: '0',
        rotateZ: 0,
        stagger: 0.05
      });
    } else {
      tl.to('.mobile_nav_text', {
        opacity: 0,
        y: '-100%',
        rotateZ: -15,
        stagger: 0.05,
        duration: 0.2
      });
      tl.to(buttonRef.current, { duration: 0.1, opacity: 0 });
      tl.to(navRef.current, {
        duration: 0.2,
        top: '-100vh'
      });
    }
  }, [nav.isNavOpened, navRef.current]);
  props;
  return (
    <motion.div
      style={{
        zIndex: 20,
        background: 'rgba(0, 0, 0, 0.64)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        top: '-100vh'
        // backdropFilter: "blur(12.1px)",
      }}
      // animate={{ top: nav.isNavOpened ? "0" : "-100vh" }}
      className="843:hidden backdrop-filter-wkit absolute left-0 top-0 h-screen  w-full overflow-y-auto bg-black"
      ref={navRef}
    >
      <button
        ref={buttonRef}
        onClick={() => nav.switchNav(!nav.isNavOpened)}
        className="absolute  right-5 top-5 flex items-center justify-center !rounded-full bg-white p-3"
      >
        <span className="inline-flex h-4 w-4 items-center justify-center">
          <MenuButton
            isOpen={nav.isNavOpened}
            strokeWidth="1.5"
            color="#000000"
            transition={{ ease: 'easeOut', duration: 0.2 }}
            width="16"
            height="12"
          />
        </span>
      </button>
      <div className="p-10 pt-[20vh]">
        <h2 className="380:text-5xl font-orbit flex flex-col gap-4 text-4xl font-semibold text-white">
          {navlinks.map((link, i) => {
            const isActive = link.route === location;
            return (
              <span key={i} className="inline-block overflow-hidden py-1">
                <Link
                  key={link.route}
                  href={link.route}
                  className={`${
                    isActive ? 'text-primary' : 'text-white'
                  } mobile_nav_text relative inline-block origin-bottom-left cursor-pointer transition-all duration-150  hover:text-primary/65`}
                >
                  {link.name}
                </Link>
              </span>
            );
          })}
        </h2>
      </div>
    </motion.div>
  );
}
