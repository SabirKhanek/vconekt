import { HTMLProps, useEffect, useRef, useState } from "react";
import {
  getResponsiveClasses,
  //   getResponsiveWidth,
} from "../shared/constants/getResponsiveClasses";
// import { Button } from "../components/button";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import { useResponsive } from "../hooks/useResponsive";
export function OurServices({ ...props }: HTMLProps<HTMLElement>) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const responsive = useResponsive();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    // cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    // new SplitType("#presence_text", {
    //   types: "chars",
    //   charClass: "presence_text_letter",
    // });
    // const textTimeline = gsap.timeline({
    //   repeat: -1,
    //   yoyo: true,
    //   repeatDelay: 1,
    // });
    // textTimeline.fromTo(
    //   ".presence_text_letter",
    //   { display: "none" },
    //   {
    //     display: "inline-block",
    //     duration: 0.01,
    //     stagger: 0.04,
    //   }
    // );

    new SplitType("#presence_text", {
      types: ["chars", "words"],
      charClass: "presence_letter",
      wordClass: "break-none",
    });
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    const tl = gsap.timeline({});
    tl.fromTo(
      ".presence_letter",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.01,
        stagger: 0.04,
      }
    );
  }, [isInView]);
  const calcCardWidth = () => {
    const slider = document.getElementById("service_slider");
    return ((slider?.clientWidth || 1024) / 3) * (4 / 5);
  };
  const [cardWidth, setCardWidth] = useState(calcCardWidth());

  useEffect(() => {
    setCardWidth(calcCardWidth());
  }, [responsive.windowWidth]);
  useGSAP(
    () => {
      if (!ref.current) return;
      const slider = document.getElementById("service_slider");
      if (!slider) return;
      const targets = Array.from(
        document.querySelectorAll(".service-card")
      ).reverse();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          pinnedContainer: contentRef.current,
          scrub: true,
          onEnter: () => {},
          snap: {
            snapTo: [
              0,
              ...targets.map((v, index) => {
                v;
                return (0.25 / 2) * (index + 1);
              }),
            ],
            duration: 0.25,
          },
        },
      });
      const animationProps = {
        start: {
          x: 0,
          y: 0,
          backgroundColor: "blue",
          scale: 1,
          gradFrom: "#131A14",
          fadeGradFrom: "#000000",
          fadeGradDirection: "0deg",
          fadeGradFromPer: "15%",
          fadeGradTo: "#00000000",
          fadeGradToPer: "100%",
          gradTo: "#000000",
          gradFromPer: 0,
          gradToPer: 100,
          gradDirection: "180deg",
        },
        center: {
          x: slider.clientWidth / 2 - cardWidth / 2,
          y: -(slider.clientHeight - cardWidth),
          backgroundColor: "red",
          scale: 1.2,
          fadeGradFrom: "rgba(0,0,0,0)",
          fadeGradDirection: "90deg",
          fadeGradFromPer: "15%",
          fadeGradTo: "#00000000",
          fadeGradToPer: "100%",
          gradFrom: "#131A14",
          gradTo: "#253426",
          gradFromPer: 1.97,
          gradToPer: 97.62,
          gradDirection: 47,
        },
        end: {
          x: slider.clientWidth - cardWidth,
          y: 0,
          backgroundColor: "blue",
          scale: 1,
          fadeGradFrom: "rgba(0,0,0,1)",
          fadeGradDirection: "0deg",
          fadeGradFromPer: "15%",
          fadeGradTo: "#00000000",
          fadeGradToPer: "100%",
          gradFrom: "#131A14",
          gradTo: "black",
          gradFromPer: 0,
          gradToPer: 100,
          gradDirection: 180,
        },
      };
      const radius = slider.clientWidth / 3;
      const dur = 2;
      var controlPoint1 = {
        x: animationProps.center.x - radius,
        y: animationProps.center.y / 2,
      };
      var controlPoint2 = {
        x: animationProps.center.x + radius,
        y: animationProps.center.y / 2,
      };

      const getInterpolations = (startObj: any, endObj: any, progress: any) => {
        const interpolations: any = {};
        Object.keys(startObj).forEach((key) => {
          interpolations[key] = gsap.utils.interpolate(
            startObj[key],
            endObj[key],
            progress
          );
        });
        return interpolations;
      };

      gsap.utils.toArray(targets).forEach((target: any, index) => {
        tl.fromTo(
          target,
          {
            x: animationProps.start.x,
            y: animationProps.start.y,
            // backgroundColor: animationProps.start.backgroundColor,
            background: `linear-gradient(${animationProps.start.gradDirection}deg, ${animationProps.start.gradFrom} ${animationProps.start.gradFromPer}%, ${animationProps.start.gradTo} ${animationProps.start.gradToPer}%)`,
            scale: animationProps.start.scale,
          },
          {
            motionPath: {
              path: [
                controlPoint1,
                { x: animationProps.center.x, y: animationProps.center.y }, // Control Point 1
                controlPoint2,
                { x: animationProps.end.x, y: animationProps.end.y },
              ],
            },
            onUpdate: () => {
              if (window.scrollY <= 0) return;
              const timeWithDelay = tl.duration();
              const delayProgress = tl.progress();
              const actualCurrentTime = timeWithDelay * delayProgress;
              const totalCurrentTime = actualCurrentTime + (dur / 2) * index;
              // const totalTimeProgress = totalCurrentTime / totalTime;
              //const totalTimeProgress = 0 // please map delayProgress (based on timeWithDelay) to totalTimeProgress (based on totalTime)
              const startTimeForTarget = index * dur;
              const currentTimeTarget = totalCurrentTime - startTimeForTarget;

              const progress = currentTimeTarget / dur; // want to get progress of individual tween keep in mind -=${dur/2}

              if (progress <= -1 || progress > 1) return;
              let interpolations: {
                [K in keyof (typeof animationProps)["start"]]: (typeof animationProps)["start"][K];
              } = animationProps.start;
              let gradient;
              gradient;
              if (progress < 0.5) {
                interpolations = getInterpolations(
                  animationProps.start,
                  animationProps.center,
                  progress * 2
                );
                gradient = `linear-gradient(${interpolations.gradDirection}, ${interpolations.gradFrom} ${interpolations.gradFromPer}, ${interpolations.gradTo} ${interpolations.gradToPer})`;
              } else {
                interpolations = getInterpolations(
                  animationProps.center,
                  animationProps.end,
                  (progress - 0.5) * 2
                );
                gradient = `linear-gradient(${interpolations.gradDirection}, ${interpolations.gradFrom} ${interpolations.gradFromPer}, ${interpolations.gradTo} ${interpolations.gradToPer})`;
              }
              const fadeGradient = `linear-gradient(${interpolations.fadeGradDirection}, ${interpolations.fadeGradFrom} ${interpolations.fadeGradFromPer}, ${interpolations.fadeGradTo} ${interpolations.fadeGradToPer})`;

              gsap.set(target.getElementsByClassName("fade_mask")[0], {
                background: fadeGradient,
              });
              gsap.set(target, {
                // background: gradient,
                scale: interpolations.scale,
              });
              setRefreshFlag({});
            },
            onComplete: () => {
              gsap.set(target, {
                // backgroundColor: animationProps.end.backgroundColor,
                scale: animationProps.end.scale,
                // background: `linear-gradient(${animationProps.end.gradDirection}, ${animationProps.end.gradFrom} ${animationProps.end.gradFromPer}, ${animationProps.end.gradTo} ${animationProps.end.gradToPer})`,
                x: animationProps.end.x,
                y: animationProps.end.y,
              });
            },
            ease: "none",
            duration: dur,
          },
          `-=${dur / 2}`
        );
      });
      return () => {
        tl.kill();
      };
    },
    {
      dependencies: [responsive.windowWidth, ref.current, contentRef.current],
      scope: ref,
      revertOnUpdate: true,
    }
  );
  const [zIndexes, setZIndexes] = useState<number[]>([]);
  const [refreshFlag, setRefreshFlag] = useState({});
  const [hiddenFlags, setHiddenFlags] = useState<boolean[]>([]);
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(".service-card"));
    const slider = document.getElementById("service_slider");
    if (!slider) return;
    const centeredPos = slider?.clientWidth / 2 - cardWidth / 2;
    const zindarr: number[] = targets.map((target, index) => {
      const targetX = gsap.getProperty(target, "translateX");
      if ((targetX as number) < centeredPos) {
        return index * 5;
      } else {
        return (targets.length + 1 - index) * 5;
      }
    });
    const hiddenCards = [];

    for (let i = 0; i < targets.length; i++) {
      if (i < targets.length - 2) hiddenCards[i] = true;
      else hiddenCards[i] = false;
    }

    targets.forEach((target, index) => {
      const targetX = gsap.getProperty(target, "translateX");
      if ((targetX as number) >= centeredPos) {
        if (index - 2 >= 0) {
          hiddenCards[index - 2] = false;
        }
      }
    });
    setHiddenFlags(hiddenCards);
    setZIndexes(zindarr as number[]);
  }, [refreshFlag]);
  return (
    <motion.section
      ref={ref}
      {...(props as any)}
      id="our_services"
      className={`text-white relative h-[300vh] flex justify-center overflow-hidden items-center w-full z-[2]  bg-transparent`}
    >
      <div
        ref={contentRef}
        id="our_services_content"
        className={`absolute w-full -translate-x-1/2 top-0 left-1/2 h-screen py-[5vh] flex justify-center ${getResponsiveClasses()}`}
      >
        <div
          className={`absolute bottom-[5vh] w-full h-1/2 max-w-5xl overflow`}
          ref={sliderContainerRef}
          id="service_slider"
        >
          {/* <div className="absolute h-full w-1left-1/2 -translate-x-1/2"></div> */}
          {[1, 2, 3, 4, 5, 6, 7].reverse().map((v, index) => {
            return (
              <div
                key={v}
                style={{
                  width: cardWidth,
                  height: cardWidth,
                  transformOrigin: "bottom center",
                  borderRadius: "6px",
                  translate: "translateX(0)",
                  zIndex: zIndexes[index],
                  display: hiddenFlags[index] ? "none" : "flex",
                }}
                className={`service-card black-gradient bottom-0 left-0 absolute flex justify-center items-center p-7 text-white`}
              >
                <span className="w-full h-full inline-flex flex-col gap-2">
                  {/* <span>{cardDetails[index % cardDetails.length].logo}</span> */}
                  <img
                    src={`${cardDetails[index % cardDetails.length].logo}`}
                    alt=""
                    className="w-10 h-10"
                  />
                  <div>
                    <h2 className="text-left">
                      {cardDetails[index % cardDetails.length].title}
                    </h2>
                    <p className="mt-2 text-left text-sm font-thin">
                      {cardDetails[index % cardDetails.length].description}
                    </p>
                  </div>
                  <a
                    className="text-primary font-medium hover:underline text-left"
                    href={cardDetails[index % cardDetails.length].link}
                  >
                    Learn more...
                  </a>
                </span>
                <div
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    width: "100%",
                    height: "100%",
                  }}
                  className="absolute left-0 top-0 inner_fade pointer-events-none fade_mask"
                ></div>
              </div>
            );
          })}
        </div>

        <div
          className={`w-full flex flex-col z-10 justify-between items-start h-full`}
        >
          <div className="flex justify-between gap-6 w-full">
            <div className="basis-1/2 shrink-0">
              <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit">
                Our Services
              </span>
              <p
                id="presence_text"
                className="my-5 leading-relaxed  md:text-[40px] xl:text-5xl font-semibold font-orbit"
              >
                Maximize <span className="text-primary">digital presence </span>{" "}
                with web, marketing, design.
                <span className="ml-2 inline-block w-1 h-9 bg-primary presence_letter type_cursor"></span>
              </p>
            </div>
            <div className="basis-1/2 shrink-0 max-w-96">
              <p className="text-white text-sm font-light pt-10">
                Success is not a destination, it’s a journey. Let us be your
                partner in that journey and help you achieve your digital goals.
                Our expert team of web developers, social media marketers, and
                UI/UX designers are committed to providing you with top-notch
                services that will drive your business forward. With us by your
                side, the sky is the limit. Let’s start this journey together
                and make your digital dreams a reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const cardDetails = [
  {
    logo: "cardIcon3.svg",
    title: "Graphics & UI design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id morbi accumsan cras laoreet.",
    link: "#",
  },
  {
    logo: "cardIcon1.svg",
    title: "Web design & develoment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id morbi accumsan cras laoreet.",
    link: "#",
  },
  {
    logo: "cardIcon2.svg",
    title: "Digital Media Marketing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id morbi accumsan cras laoreet.",
    link: "#",
  },
];
