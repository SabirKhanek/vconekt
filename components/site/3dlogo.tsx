'use client';

import { ReactRef, useGSAP } from '@gsap/react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
export interface V3dProps {
  className?: string;
  nextElRef?: ReactRef;
}
export default function V3d({ nextElRef }: V3dProps) {
  const location = usePathname();

  const elementRef = useRef<HTMLDivElement>(null);
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };

  useEffect(() => {
    const onPointerMove = (e: MouseEvent & TouchEvent) => {
      if (elementRef.current?.classList.contains('hidden')) return;

      let clientX, clientY;

      // Check if it's a touch event
      if (e.touches && e.touches.length) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const screenWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const screenHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      const sensivity = 0.1;
      const relativeX = clientX / screenWidth;
      const relativeY = clientY / screenHeight;
      const yRotation = (relativeX - 0.5) * Math.PI * 2 * sensivity;
      const xRotation = (relativeY - 0.5) * Math.PI * 2 * sensivity;
      const logo = spline.current?.findObjectById(
        '4105c047-d140-4582-9486-75af7f9aa712'
      );
      if (logo) {
        logo.rotation.y = yRotation;
        logo.rotation.x = xRotation;
      }
    };
    const pointerLeave = () => {
      console.log('left');
      const logo = spline.current?.findObjectById(
        '4105c047-d140-4582-9486-75af7f9aa712'
      );
      if (logo) {
        logo.rotation.y = 0;
        logo.rotation.x = 0;
      }
    };
    window.addEventListener('mousemove', onPointerMove as any);
    window.addEventListener('touchmove', onPointerMove as any);
    window.addEventListener('touchend', pointerLeave);

    return () => {
      window.removeEventListener('mousemove', onPointerMove as any);
      window.removeEventListener('touchmove', onPointerMove as any);
      window.removeEventListener('touchend', pointerLeave);
    };
  }, []);

  useGSAP(() => {
    if (!is3dModelLoaded) return;
    if (!elementRef.current) return;
    let NextEle =
      nextElRef?.current ||
      document.getElementById(
        location === '/'
          ? 'about_us'
          : location === '/services'
          ? 'services'
          : ''
      );

    const logo = spline.current?.findObjectById(
      '4105c047-d140-4582-9486-75af7f9aa712'
    );

    if (logo) {
      const tl = gsap.timeline({});
      tl.set(logo.scale, { x: 1, y: 1, z: 1 });

      tl.to(logo.scale, {
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 0px',
          end: 'center top',
          endTrigger: NextEle,
          scrub: true
        },
        x: 25,
        y: 25,
        z: 25
      });
    }

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'bottom top',
          endTrigger: NextEle,
          end: 'bottom top',
          onEnter: () => {
            console.log('entered');
            // Add the class 'z-0' when entering the viewport
            elementRef.current?.classList.add('z-10');
            // Remove the class 'z-10' if it was previously added
            elementRef.current?.classList.remove('z-[3]');
          },
          onLeave: () => {
            console.log('left');
            // Add the class 'z-10' when leaving the viewport
            elementRef.current?.classList.add('z-[3]');
            // Remove the class 'z-0' if it was previously added
            elementRef.current?.classList.remove('z-10');
            // elementRef.current?.classList.add("hidden");
          },
          onLeaveBack: () => {
            console.log('leave back');
            // Add the class 'z-10' when leaving the viewport
            elementRef.current?.classList.add('z-[3]');
            // Remove the class 'z-0' if it was previously added
            elementRef.current?.classList.remove('z-10');
          }
        }
      }
    );

    gsap.to(elementRef.current, {
      opacity: 0,
      scrollTrigger: {
        onLeave: () => {
          elementRef.current?.classList.add('hidden');
        },
        onLeaveBack: () => {
          elementRef.current?.classList.remove('hidden');
        },
        onEnterBack: () => {
          elementRef.current?.classList.remove('hidden');
        },
        trigger: NextEle,
        start: 'top top',

        end: 'center top',
        scrub: true
      }
    });
  }, [is3dModelLoaded, elementRef.current, nextElRef, location]);
  return (
    <div
      ref={elementRef}
      className={`pointer-events-none fixed left-0 top-0 z-[3] min-h-screen w-full ${
        is3dModelLoaded ? '' : 'hidden'
      } ${location !== '/' && location !== '/services' ? '!hidden' : ''}`}
    >
      <Spline
        id="spline"
        onLoad={onLoad}
        className="absolute-centered  flex items-center justify-center"
        scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode"
        onScroll={() => {
          console.log('scrolled');
        }}
      />
    </div>
  );
}
