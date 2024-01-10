import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AboutUs({ ...props }: HTMLProps<HTMLElement>) {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2-content-wrapper",
        start: "top top",
        endTrigger: props.id || "#about_us",
        end: "bottom bottom",
        pin: true,
        scrub: true,
        // markers: true,
      },
    });
    tl.to("#section2-content", {
      translateZ: 0,
      rotateY: 0,
      opacity: 1,
    });
  }, []);

  return (
    <section
      {...props}
      // data-speed={1.5}
      className={`relative w-full h-[250vh] z-[2] flex bg-transparent justify-start ${getResponsiveClasses()}`}
    >
      <div
        id="section2-content-wrapper"
        className="h-screen w-full perspective-container flex justify-center items-center"
      >
        <div
          id="section2-content"
          className="w-full h-[80vh] bg-white text-black  flex justify-center items-center"
        >
          <div className="box"></div>
        </div>
      </div>
    </section>
  );
}
