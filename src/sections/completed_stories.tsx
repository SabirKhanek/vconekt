import { HTMLProps, useRef } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
        start: "top 50%",
        toggleActions: "play pause resume reset",
      },
      onUpdate: () => {
        const elems = document.getElementsByClassName("completed-counter");
        elems[0].innerHTML = parseInt(obj.projects.toString()).toString();
        elems[1].innerHTML = parseInt(obj.stories.toString()).toString();
        elems[2].innerHTML = parseInt(obj.advisors.toString()).toString();
      },
    });
  }, [ref.current]);
  return (
    <section
      ref={ref}
      {...props}
      className={` text-white relative my-28 flex justify-center items-center w-full z-[2]  bg-transparent  ${getResponsiveClasses()}`}
    >
      <div className="rounded-3xl border w-full flex flex-col justify-center items-center border-white/65 lg:px-20 py-10 md:px-10 px-5 gap-3">
        <span className="rounded-3xl text-xs bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
          Completed Stories!
        </span>
        <span className="text-center text-3xl small-heading text-white font-orbit">
          WE DO AWESOME CONTRIBUTE FOR OUR CLIENTS, CHECK SOME OF OUR COUNTER
        </span>
        <div className="flex flex-col gap-y-6 600:flex-row justify-between w-3/4">
          <div className="flex flex-col text-center 600:text-left gap-2">
            <span className="completed-counter  hollow-text font-orbit text-5xl md:text-6xl  font-semibold">
              0
            </span>
            <span className="font-orbit text-lg md:text-xl text-primary">
              Projects
              <br />
              Completed
            </span>
          </div>
          <div className="flex flex-col text-center 600:text-center  gap-2">
            <span className="completed-counter hollow-text font-orbit text-5xl md:text-6xl  font-semibold">
              0
            </span>
            <span className="font-orbit text-lg md:text-xl text-primary">
              Our
              <br />
              Happy Clients
            </span>
          </div>
          <div className="flex flex-col text-center gap-2 600:text-right">
            <span className="completed-counter hollow-text font-orbit text-5xl md:text-6xl  font-semibold">
              0
            </span>
            <span className="font-orbit text-lg md:text-xl text-primary">
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
