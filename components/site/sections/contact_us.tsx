'use client';
import { HTMLProps } from 'react';
import { V3dContactUs } from '@/components/site/3dLogoInContactUs';
import { MdOutlineMail } from 'react-icons/md';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nossr from '../nossr';
export function ContactUs({ ...props }: HTMLProps<HTMLElement>) {
  return (
    <section
      {...props}
      className={` responsive relative z-[2] h-screen w-full  max-w-5xl bg-transparent text-white`}
    >
      <div className="absolute-centered flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-white/65 px-10 py-10 520:px-20">
        <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit text-xs uppercase text-primary ">
          TAKE YOUR BUSINESS TO NEW HEIGHTS
        </span>
        <span className="small-heading max-w-2xl text-center font-orbit text-3xl font-bold text-white">
          Contact us today to discuss your project and explore how our
          innovative digital solutions can help you achieve your goals.
        </span>
        <div className="relative h-52 w-full">
          <Nossr>
            <V3dContactUs scale={0.5} />
          </Nossr>

          <Link href="/contact-us">
            <motion.button
              initial={{
                background:
                  'radial-gradient(circle closest-side, #fff 0%, transparent 0%)',
                scale: 1,
                transform: 'translateX(-50%) translateY(-50%)'
              }}
              whileHover={{
                background:
                  'radial-gradient(circle closest-side, #fff 100%, transparent 100%)',
                scale: 1.2,
                color: '#000',
                transform: 'translateX(-50%) translateY(-50%)'
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute-centered  flex h-20 w-20 items-center justify-center rounded-full border border-primary p-2"
            >
              <MdOutlineMail className="text-3xl" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
