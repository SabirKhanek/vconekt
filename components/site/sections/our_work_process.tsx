'use client';
import { useGSAP } from '@gsap/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
export function OurWorkProcess() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  useGSAP(() => {
    new SplitType('#process_text', {
      types: ['chars', 'words'],
      charClass: 'process_text_letter',
      wordClass: 'break-none'
    });
    const tl = gsap.timeline({});
    tl.fromTo(
      '.process_text_letter',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.01,
        stagger: 0.03
      }
    );
  }, [isInView]);
  return (
    <section ref={ref} className={`${'responsive'} relative z-[3] my-10`}>
      <span className="font-orbit rounded-3xl bg-primary/15 px-5 py-2 uppercase text-primary">
        Our Work Process
      </span>
      <h2 className="heading my-3 max-w-[80%] text-white" id="process_text">
        Navigating Through Our Seamless Work{' '}
        <span className="text-primary">Process</span>
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        {process.map((v, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8, y: -20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.4, delay: 0.5 * i }
              }}
              key={i}
              className="flex items-start gap-3"
            >
              <span className="font-orbit font-semibold text-primary">
                0{i + 1}
              </span>
              <div>
                <h1 className="font-orbit text-2xl font-semibold">{v.name}</h1>
                <div className="mt-3 flex flex-row gap-3 md:flex-col">
                  {v.substeps.map((sv, si) => {
                    return (
                      <div key={si}>
                        <h2 className="font-orbit font-bold">{sv.name}</h2>
                        <p className="text-sm font-light">{sv.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const process = [
  {
    name: 'Immersion',
    substeps: [
      {
        name: 'Understanding',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      },
      {
        name: 'Alignment',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      }
    ]
  },
  {
    name: 'Creation',
    substeps: [
      {
        name: 'Planning',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      },
      {
        name: 'Design',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      }
    ]
  },
  {
    name: 'Build',
    substeps: [
      {
        name: 'Production',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      },
      {
        name: 'Delivery',
        desc: 'Conducting an initial workshop with the client leaders to Understand the project vision and requirements.'
      }
    ]
  }
];
