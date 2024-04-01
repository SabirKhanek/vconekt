import { HTMLProps, useEffect, useRef, useState } from "react";
import {
  getResponsiveClasses,
  //   getResponsiveWidth,
} from "../shared/constants/getResponsiveClasses";
// import { Button } from "../components/button";
import { ReactRef, useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import { useResponsive } from "../hooks/useResponsive";

export function OurServices({ ...props }: HTMLProps<HTMLElement>) {
  const responsive = useResponsive();

  if (responsive.windowWidth < 1024)
    return (
      <ServiceSectionSmall
        responsive={responsive}
        {...props}
      ></ServiceSectionSmall>
    );
  else
    return (
      <ServiceSectionLarge
        responsive={responsive}
        {...props}
      ></ServiceSectionLarge>
    );
}

function ServiceSectionSmall({
  responsive,
  ...props
}: { responsive: ReturnType<typeof useResponsive> } & HTMLProps<HTMLElement>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        endTrigger: scrollContainerRef.current,
        pin: true,
        pinnedContainer: containerRef.current,
        pinSpacing: false,
        scrub: true,
        snap: {
          snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: "linear",
        },
      },
    });

    tl.to(
      {},
      {
        onUpdate: () => {
          const progress = tl.progress();
          // console.log(progress);
          // console.log({
          //   progress,
          //   scrollWidth: sliderRef.current?.scrollWidth,
          //   scrollBy: progress * (sliderRef.current?.scrollWidth || 0),
          // });
          sliderRef.current?.scroll({
            left: progress * sliderRef.current.scrollWidth,
            behavior: "instant",
          });
        },
        scrub: true,
      }
    );
  }, []);
  return (
    <>
      <div
        {...(props as any)}
        ref={scrollContainerRef}
        className="responsive relative z-[2] h-[300vh] -mt-14"
      >
        <div
          ref={containerRef}
          className="h-screen flex flex-col justify-center"
        >
          <span className="rounded-3xl w-fit bg-primary/15 text-primary px-5 py-2 uppercase font-orbit">
            Our Services
          </span>
          <p className="heading max-lm:!text-[34px] max-lm:!max-h-full !leading-tight text-[5vw] font-semibold font-orbit my-5">
            Building Bridges to Digital Brilliance Together with Vconekt LLC
          </p>
          <ServiceCardSliderSmall sliderRef={sliderRef} />
        </div>
      </div>
      <p className="relative z-[2] responsive -mt-10">
        Embark on a Digital Journey with VconektLLC. Our Comprehensive IT
        solutions for startups and Services are your compass in the vast terrain
        of online innovation. From Web Design and Development to Mobile App
        Creation, Search Engine Optimization, and beyond, we offer a holistic
        approach to elevate your digital presence. Let us guide you through the
        intricacies of the digital world, transforming challenges into
        opportunities and aspirations into achievements. Explore our array of
        services and redefine your online narrative with VconektLLC.
      </p>
    </>
  );
}

function ServiceCardSliderSmall({ sliderRef }: { sliderRef: ReactRef }) {
  return (
    <div
      id={"service_slider"}
      ref={sliderRef}
      className="flex items-center justify-start overflow-x-auto no-scrollbar gap-7"
    >
      {[...Array(5)].map((_, i, arr) => {
        return (
          <ServiceCard
            index={i}
            total={arr.length}
            key={i}
            {...cardDetails[i % (cardDetails.length - 1)]}
          ></ServiceCard>
        );
      })}
    </div>
  );
}

function ServiceCard({
  description,
  link,
  logo,
  title,
}: // index,
// total,
(typeof cardDetails)[0] & { index: number; total: number }) {
  return (
    <div
      style={{
        transformOrigin: "bottom center",
        borderRadius: "6px",
        display: "flex",
      }}
      className={`w-72 h-72 aspect-square black-gradient snap-center flex justify-center items-center p-7 text-white`}
    >
      <span className="w-full h-full inline-flex flex-col gap-2">
        <img src={logo} alt="" className="w-10 h-10" />
        <div>
          <h2 className="text-left">{title}</h2>
          <p className="mt-2 text-left text-sm font-thin">{description}</p>
        </div>
        <a
          className="text-primary font-medium hover:underline text-left"
          href={link}
        >
          Learn more...
        </a>
      </span>
    </div>
  );
}

function ServiceSectionLarge({
  responsive,
  ...props
}: { responsive: ReturnType<typeof useResponsive> } & HTMLProps<HTMLElement>) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
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
      if (responsive.windowWidth < 1024) return;
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
    if (responsive.windowWidth < 1024) return;
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
      className={`text-white hidden  relative h-[300vh] lg:flex justify-center overflow-hidden items-center w-full z-[2]  bg-transparent`}
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
                Building Bridges to{" "}
                <span className="text-primary">Digital Brilliance</span>{" "}
                Together with Vconekt LLC
                <span className="ml-2 inline-block w-1 h-9 bg-primary presence_letter type_cursor"></span>
              </p>
            </div>
            <div className="basis-1/2 shrink-0 max-w-96">
              <p className="text-white text-sm font-light pt-10">
                Embark on a Digital Journey with VconektLLC. Our Comprehensive
                IT solutions for startups and Services are your compass in the
                vast terrain of online innovation. From Web Design and
                Development to Mobile App Creation, Search Engine Optimization,
                and beyond, we offer a holistic approach to elevate your digital
                presence. Let us guide you through the intricacies of the
                digital world, transforming challenges into opportunities and
                aspirations into achievements. Explore our array of services and
                redefine your online narrative with VconektLLC.
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
      "Elevate brand aesthetics and user experiences with our Graphic and UI Design solutions.",
    link: "#",
  },
  {
    logo: "cardIcon1.svg",
    title: "Web design & develoment",
    description:
      "Transforming visions into digital realities with Web Design & Development expertise.",
    link: "#",
  },
  {
    logo: "cardIcon2.svg",
    title: "Digital Media Marketing",
    description:
      "Drive audience engagement and brand visibility with tailored Digital Media Marketing strategies.",
    link: "#",
  },
];
