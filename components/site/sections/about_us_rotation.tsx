import { HTMLProps, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function AboutUs({ ...props }: HTMLProps<HTMLElement>) {
  const [rotationValues, setRotationValues] = useState({ x: 0, y: -90 });
  const elementRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#section2-content-wrapper',
        start: 'top top',
        endTrigger: props.id || '#about_us',
        end: 'bottom bottom',
        pin: true,
        scrub: true
        // markers: true,
      }
    });

    tl.to(rotationValues, {
      x: 0,
      y: 0,
      ease: 'power1.out',
      onUpdate: () => {
        const element = elementRef.current;
        if (element) {
          const currentRotation = getComputedRotation(element);
          element.style.transform = `rotateX(${
            currentRotation.x + rotationValues.x
          }rad) rotateY(${currentRotation.y + rotationValues.y}rad)`;
        }
      }
    });

    tl.to('#section2-content', {
      translateZ: 0
    });
  }, []);
  useEffect(() => {
    if (elementRef) {
      const currentRotation = getComputedRotation(elementRef.current);
      setRotationValues({ x: currentRotation.x, y: currentRotation.y });
    }
    const onMouseMove = (e: MouseEvent) => {
      // console.log(e.clientX, e.clientY);
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const screenWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const screenHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      const sensivity = 0.1;
      const relativeX = mouseX / screenWidth;
      const relativeY = mouseY / screenHeight;
      const yRotation = (relativeX - 0.5) * Math.PI * 2 * sensivity;
      const xRotation = (relativeY - 0.5) * Math.PI * 2 * sensivity;
      yRotation;
      xRotation;
      const item = document.querySelector('#section2-content');
      if (item) {
        // gsap.to("#section2-content", {
        //   rotateY: yRotation,
        //   rotateX: xRotation,
        //   duration: 0.5, // Adjust the duration as needed
        // });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const getComputedRotation = (element: any) => {
    const style = window.getComputedStyle(element);
    const transform = style.getPropertyValue('transform');
    const matrix = new DOMMatrix(transform);
    const xRotation = Math.atan2(matrix.m23, matrix.m22);
    const yRotation = Math.atan2(
      -matrix.m13,
      Math.sqrt(matrix.m23 ** 2 + matrix.m33 ** 2)
    );

    return { x: xRotation, y: yRotation };
  };
  return (
    <section
      {...props}
      className={`responsive relative z-[2] flex h-[200vh] w-full justify-start bg-transparent`}
    >
      <div
        id="section2-content-wrapper"
        className="perspective-container flex h-screen w-full items-center justify-center"
      >
        <div
          id="section2-content"
          ref={elementRef}
          className="flex h-[80vh] w-full items-center  justify-center bg-white text-black"
        >
          <div className="box"></div>
        </div>
      </div>
    </section>
  );
}
