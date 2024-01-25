import { HTMLProps, useState } from "react";
import { Button } from "../components/button";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { motion } from "framer-motion";
export function RecentWork({ ...props }: HTMLProps<HTMLElement>) {
  const [slideReelTimeline, setSlideReelTimeline] =
    useState<gsap.core.Timeline | null>();
  const [hoveredReel, setHoveredReel] = useState<number | null>(null);
  //   const [isAnimating, setIsAnimating] = useState(false);
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
    const reels = document.getElementsByClassName("service_reel_item");
    const reel_container = document.getElementById("reel_container");
    const slideReelTimeline = gsap.timeline({});
    setSlideReelTimeline(slideReelTimeline);
    slideReelTimeline.to(".service_reel_item", {
      repeat: -1,
      repeatRefresh: true,
      duration: 0.01,
      onRepeatComplete: (reelIndex: number) => {
        const reelContainerLeft = reel_container?.clientLeft;
        // const reelLeft = reels[reelIndex].getBoundingClientRect().left;
        const reelRight = reels[reelIndex].getBoundingClientRect().right;
        const reelContainerRight =
          reelContainerLeft || 0 + (reel_container?.clientWidth || 0);
        const reelWidth = reels[reelIndex].clientWidth;

        const currentPosition = gsap.getProperty(reels[reelIndex], "x");

        if (reelRight < 0 && reelRight >= -10) {
          gsap.set(reels[reelIndex], { x: reelContainerRight - reelWidth });
        } else {
          gsap.set(reels[reelIndex], { x: (currentPosition as number) - 1 });
        }
      },
    });
  }, []);

  const { contextSafe } = useGSAP(() => {
    if (hoveredReel) {
      if (!slideReelTimeline) {
        console.log(slideReelTimeline, "not defined");
        return;
      }
      slideReelTimeline.pause();
      const reels = document.getElementsByClassName("service-reel-item-inner");
      const reel = reels[hoveredReel];
      gsap.to(reel, { opacity: 1, rotateY: "0deg", scale: 1.2 });
    }
  }, [hoveredReel]);

  const onHoverReel = (reelNumber: number) => {
    if (hoveredReel !== reelNumber) setHoveredReel(reelNumber);
  };
  const onHoverExit = contextSafe((reelNumber: number) => {
    const reels = document.getElementsByClassName("service-reel-item-inner");
    const reel = reels[reelNumber];
    gsap.to(reel, { opacity: 0.7, rotateY: "15deg", scale: 1 });
    setHoveredReel(null);
    slideReelTimeline?.resume();
  });
  const height = 150;
  const width = height * 1.84;
  return (
    <motion.section
      {...(props as any)}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={` text-white relative h-screen w-full z-[2]  bg-transparent justify-start overflow-hidden`}
    >
      <div
        id="reel_container"
        style={{ width: (width + 10) * 7, height: height * 1.3 }}
        className="absolute h-[300px] top-1/2 -translate-y-1/2 z-0 overflow-y-visible overflow-x-hidden"
      >
        {[1, 2, 3, 4, 5, 1, 2].map((n, index) => {
          const transformValue = `translateX(${(width + 10) * index}px)`;
          return (
            <div
              style={{
                width,
                transform: transformValue,
                height,
                perspective: 500,
                perspectiveOrigin: "center",
                position: "absolute",
              }}
              className="service_reel_item cursor-pointer top-5 overflow-y-visible"
              key={index}
            >
              <div
                style={{
                  transformOrigin: "center",
                  transform: "rotateY(15deg)",
                  opacity: 0.7,
                }}
                onMouseOver={() => {
                  onHoverReel(index);
                }}
                onMouseLeave={() => {
                  onHoverExit(index);
                }}
                className="service-reel-item-inner p-1 h-full border border-white/65 absolute "
              >
                <img
                  src={`/service_reel_${n}.png`}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`absolute-centered w-full flex flex-col z-10 justify-start items-start h-full py-[10vh] pointer-events-none  ${getResponsiveClasses()}`}
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
        <Button className="pointer-events-auto">View All Portfolio</Button>
      </div>
    </motion.section>
  );
}
