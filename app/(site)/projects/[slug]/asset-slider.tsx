'use client';
import { useEffect, useRef, useState } from 'react';
import { Project } from '../comps';
import { motion } from 'framer-motion';
import { GoArrowRight } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AssetSlider({ samples }: { samples: Project['samples'] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % samples.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [samples.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = -currentIndex * 100;
      sliderRef.current.style.transform = `translateX(${translateX}%)`;
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, [currentIndex]);

  if (samples.length <= 0) return null;

  return (
    <div className="my-10 overflow-hidden">
      <div ref={sliderRef} className="flex aspect-[1.98/1] w-full">
        {samples.map((sample, index) => (
          <div
            key={index}
            className="flex h-full w-full shrink-0 basis-full items-center justify-center"
          >
            {sample.type === 'image' ? (
              <SliderImage sample={sample} />
            ) : (
              <SliderVideo sample={sample} />
            )}
          </div>
        ))}
      </div>
      <SliderNavigator
        samples={samples}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
export function SliderNavigator({
  samples,
  currentIndex,
  setCurrentIndex
}: any) {
  return (
    <div className="my-5 flex items-center justify-center gap-3">
      {samples.map((_: any, i: any) => (
        <div
          key={i}
          onClick={() => setCurrentIndex(i)}
          className={`h-4 w-4 rounded-full border ${
            currentIndex === i ? 'border-primary bg-primary' : 'border-white'
          } cursor-pointer transition-all duration-500 ease-in-out`}
        ></div>
      ))}
    </div>
  );
}

export function SliderImage({
  sample
}: {
  sample: Project['samples'][number];
}) {
  return (
    <img src={sample.src} className="aspect-auto h-full w-auto max-w-full" />
  );
}

export function SliderVideo({
  sample
}: {
  sample: Project['samples'][number];
}) {
  return (
    <video
      src={sample.src}
      autoPlay
      muted
      loop
      className="aspect-auto h-full w-auto max-w-full"
    ></video>
  );
}

export const MotionButton = ({ href }: { href: string }) => {
  const navigate = useRouter().push;
  return (
    <motion.a
      onClick={(e) => {
        e.stopPropagation();
        navigate(href);
      }}
      href={href}
      initial={{
        background:
          'radial-gradient(circle closest-side, #fff 0%, transparent 0%)',
        color: '#fff'
      }}
      whileHover={{
        background:
          'radial-gradient(circle closest-side, #fff 100%, transparent 100%)',
        color: '#000'
      }}
      className="rounded-full border border-white bg-transparent  p-1 transition-all duration-150 hover:scale-110"
    >
      <GoArrowRight className="-rotate-[30deg] text-lg" />
    </motion.a>
  );
};
