'use client';
import Link from 'next/link';
import { Button } from './button';
import { MenuButton } from './menu-button';
import { MobileNav } from './mobile-nav';
import { usePathname, useRouter } from 'next/navigation';
import { getResponsiveClasses } from '@/constants';
import { useNavSwitch } from './nav-switch';
import Nossr from './nossr';

export interface NavbarProps {
  className?: string;
}
export function Navbar({ className }: NavbarProps) {
  const location = usePathname();
  const router = useRouter();
  const nav = useNavSwitch();
  return (
    <nav
      className={`responsive absolute left-0 right-0 top-5 z-[11] flex w-full items-center justify-between ${className}`}
    >
      <Link href={'/'}>
        <img src="/logo.png" className="h-auto w-[75%]" alt="Logo" />
      </Link>
      <div className="hidden items-center gap-4 text-sm 843:flex 939:gap-6 939:text-base ">
        {navlinks.map((link, i) => {
          const isActive = link.route === location;
          return (
            <Link
              key={i}
              href={link.route}
              className={`${
                isActive ? 'text-primary' : 'text-white'
              } relative cursor-pointer font-sans transition-all duration-150 hover:text-primary/65`}
            >
              {link.name}
              {location === link.route && ( // render this only when the route is active
                <svg
                  width="8"
                  height="42"
                  className="absolute -top-[50px] left-1/2 -translate-x-1/2"
                  viewBox="0 0 8 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.75 3.27835e-08C4.75 -0.414214 4.41421 -0.75 4 -0.75C3.58579 -0.75 3.25 -0.414214 3.25 -3.27835e-08L4.75 3.27835e-08ZM4 34C1.79086 34 -1.56447e-06 35.7909 -1.66103e-06 38C-1.7576e-06 40.2091 1.79086 42 4 42C6.20914 42 8 40.2091 8 38C8 35.7909 6.20914 34 4 34ZM3.25 -3.27835e-08L3.25 38L4.75 38L4.75 3.27835e-08L3.25 -3.27835e-08Z"
                    fill="#B2E161"
                  />
                </svg>
              )}
            </Link>
          );
        })}
        {/* <Button
          onClick={() => router.push('/services')}
          className="font-orbit text-sm"
        >
          Discover More!
        </Button> */}
      </div>

      <button
        onClick={() => nav.switchNav(!nav.isNavOpened)}
        className="flex items-center justify-center !rounded-full bg-white p-3 843:hidden"
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
        <Nossr>
          <MobileNav></MobileNav>
        </Nossr>
      </button>
    </nav>
  );
}

export const navlinks = [
  { name: 'Home', route: '/' },
  { name: 'About Us', route: '/about-us' },
  { name: 'Services', route: '/services' },
  { name: 'Projects', route: '/projects' },
  { name: 'Blogs', route: '/blogs' },
  { name: 'Contact Us', route: '/contact-us' }
];
