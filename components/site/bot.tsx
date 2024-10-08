'use client';
import { useGSAP } from '@gsap/react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { HTMLProps, useEffect, useRef, useState } from 'react';

export interface Bot3DProps extends HTMLProps<HTMLDivElement> {
  scale?: number;
}

export function Bot3D({ scale, ...props }: Bot3DProps) {
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  useGSAP(() => {
    if (!is3dModelLoaded) return;
    const bot = spline.current?.findObjectById(
      '424e2cb5-1cda-412c-8291-203803687215'
    );
    if (!bot) return;
    const rotationAmount = direction !== 'left' ? -0.36 : -2.45;
    gsap.to(bot.rotation, { y: rotationAmount, duration: 1 });
  }, [direction, is3dModelLoaded]);

  const onMouseMove = (e: MouseEvent) => {
    const screenWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const mouseX = e.clientX;

    if (mouseX < screenWidth / 2) {
      setDirection('left');
    } else if (mouseX > screenWidth / 2) {
      setDirection('right');
    }
  };

  useEffect(() => {
    console.log(direction);
  }, [direction]);

  useEffect(() => {
    const cvs = spline.current;
    if (!cvs) return;
    const bot = cvs.findObjectById('424e2cb5-1cda-412c-8291-203803687215');
    console.log('Here');
    if (bot) {
      const scaleAmnt = 2;
      bot.scale.x = scaleAmnt;
      bot.scale.y = scaleAmnt;
      bot.scale.z = scaleAmnt;
    }
  }, [is3dModelLoaded]);

  const isInView = useInView(elementRef);
  useEffect(() => {
    if (isInView) {
      window.addEventListener('mousemove', onMouseMove);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInView]);

  return (
    <div
      ref={elementRef}
      className={`pointer-events-none absolute left-0 top-0 h-full w-full ${
        is3dModelLoaded ? '' : 'hidden'
      }`}
      {...props}
    >
      <Spline
        id="spline"
        onLoad={onLoad}
        className="absolute-centered  flex items-center justify-center"
        scene="https://prod.spline.design/3j7cox8YTtMGwSkT/scene.splinecode"
      />
    </div>
  );
}
