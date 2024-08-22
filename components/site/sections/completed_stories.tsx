'use client';
import { HTMLProps, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function CompletedStories({ ...props }: HTMLProps<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const obj = { projects: 0, stories: 0, advisors: 0 };
    gsap.to(obj, {
      projects: 310,
      stories: 200,
      advisors: 15,
      duration: 2,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 50%',
        toggleActions: 'play pause resume reset'
      },
      onUpdate: () => {
        const elems = document.getElementsByClassName('completed-counter');
        elems[0].innerHTML = parseInt(obj.projects.toString()).toString();
        elems[1].innerHTML = parseInt(obj.stories.toString()).toString();
        elems[2].innerHTML = parseInt(obj.advisors.toString()).toString();
      }
    });
  }, [ref.current]);
  return (
    <section
      ref={ref}
      {...props}
      className={` relative z-[2] my-28 flex w-full items-center justify-center bg-transparent  text-white  ${'responsive'}`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-white/65 px-5 py-10 md:px-10 lg:px-20">
        <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit text-xs uppercase text-primary ">
          A Glimpse into Our Journey
        </span>
        <span className="small-heading text-center font-orbit text-3xl text-white">
          Explore our impressive track record of delivering exceptional digital
          solutions.
        </span>
        <div className="flex w-3/4 flex-col justify-between gap-y-6 600:flex-row">
          <div className="flex flex-col gap-2 text-center 600:text-left">
            <span className="completed-counter  hollow-text font-orbit text-5xl font-semibold  md:text-6xl">
              0
            </span>
            <span className="font-orbit text-lg text-primary md:text-xl">
              Projects
              <br />
              Completed
            </span>
          </div>
          <div className="flex flex-col gap-2 text-center  600:text-center">
            <span className="completed-counter hollow-text font-orbit text-5xl font-semibold  md:text-6xl">
              0
            </span>
            <span className="font-orbit text-lg text-primary md:text-xl">
              Our
              <br />
              Happy Clients
            </span>
          </div>
          <div className="flex flex-col gap-2 text-center 600:text-right">
            <span className="completed-counter hollow-text font-orbit text-5xl font-semibold  md:text-6xl">
              0
            </span>
            <span className="font-orbit text-lg text-primary md:text-xl">
              Team
              <br />
              Advisors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
