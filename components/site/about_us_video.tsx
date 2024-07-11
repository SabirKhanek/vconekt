'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
// import { getResponsiveWidth } from "../shared/constants/getResponsiveClasses";

export function AboutUsVideo() {
  const videoContainer = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!videoContainer.current) return;
    if (!scrollContainer.current) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: () => 'top top',
        // markers: true,
        pin: true,
        pinSpacing: false,
        pinnedContainer: videoContainer.current,
        end: () => 'bottom bottom'
      }
    });
  }, []);
  React.useId();
  return (
    <div
      ref={scrollContainer}
      id="scroll_container"
      className="650:h-[300vh] pointer-events-none  "
    >
      <div
        ref={videoContainer}
        className="650:h-screen pointer-events-auto flex flex-col items-center justify-center"
      >
        <div
          style={{}}
          className={`responsive relative aspect-[1.98/1] w-full`}
        >
          <video
            src="/recent_projects.mp4"
            muted
            autoPlay
            loop
            // controls
            width={'100%'}
            height={'100%'}
          ></video>
        </div>
      </div>
    </div>
  );
}
