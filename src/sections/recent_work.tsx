import { HTMLProps } from "react";
import { Button } from "../components/button";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { transform } from "framer-motion";

export function RecentWork({ ...props }: HTMLProps<HTMLElement>) {
  useGSAP(() => {
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    new SplitType("#service_text", {
      types: "chars",
      charClass: "service_text_letter",
    });
    const textTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 1,
    });
    textTimeline.fromTo(
      ".service_text_letter",
      { display: "none" },
      {
        display: "inline-block",
        duration: 0.01,
        stagger: 0.04,
      }
    );
    const serviceReelTimeline = gsap.timeline({});
    serviceReelTimeline.fromTo(
      "#reel_container",
      {
        rotateZ: 2,
        y: 30,
      },
      {
        rotateZ: -2,
        y: -30,
        scrollTrigger: {
          trigger: "#recent_work",
          start: "-25% top",
          end: "+25% top",
          scrub: true,
        },
      }
    );
  }, []);
  return (
    <section
      {...props}
      className={` text-white relative h-screen w-full z-[2]  bg-transparent justify-start`}
    >
      <div
        id="reel_container"
        className="absolute  top-1/2 -translate-y-1/2 z-0"
      >
        {[1, 2, 3, 4, 5, 1, 2].map((n, index) => {
          const height = 300;
          const width = height * 1.84;
          const transformValue = `perspective(500px) translateZ(-250px) rotateY(7deg)   translateX(${
            (width + 30) * index
          }px)`;
          console.log(transformValue);
          return (
            <div
              key={index}
              style={{
                transform: transformValue,
                transformOrigin: "left",
                width: `${width}px`,
                height: `${height}px`,
                opacity: 0.7,
                top: -(height / 2),
              }}
              className="p-1 border border-white/65 absolute"
            >
              <img
                src={`/service_reel_${n}.png`}
                className="object-cover w-full h-full"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div
        className={`absolute-centered w-full flex flex-col z-10 justify-start items-start h-full py-[10vh]  ${getResponsiveClasses()}`}
      >
        <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit">
          Recent Work
        </span>
        <p className="max-w-[50%] my-5 leading-relaxed text-5xl font-semibold font-orbit">
          Elevate your online presence with our integrated web, marketing, and
          design
          <br />
          <span className="text-primary inline-block " id="service_text">
            services.{" "}
            <span className="ml-2 inline-block w-1 h-9 bg-primary type_cursor"></span>
          </span>
        </p>
        <Button>View All Portfolio</Button>
      </div>
    </section>
  );
}
