import { HTMLProps, useRef } from "react";
import {
  getResponsiveClasses,
//   getResponsiveWidth,
} from "../shared/constants/getResponsiveClasses";
// import { Button } from "../components/button";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";

export function OurServices({ ...props }: HTMLProps<HTMLElement>) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    new SplitType("#presence_text", {
      types: "chars",
      charClass: "presence_text_letter",
    });
    const textTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 1,
    });
    textTimeline.fromTo(
      ".presence_text_letter",
      { display: "none" },
      {
        display: "inline-block",
        duration: 0.01,
        stagger: 0.04,
      }
    );
  }, []);
  const cardWidth = () => {
    return ((sliderContainerRef.current?.clientWidth || 1260) / 3) * (3 / 5);
  };
  useGSAP(() => {
    const slider = document.getElementById("service_slider");
    if (!slider) return;
    const startX = 0;
    const startY = 0;
    const centerY = -(slider.clientHeight - cardWidth());
    const centerX = slider.clientWidth / 2 - cardWidth() / 2;
    const endX = slider.clientWidth - cardWidth();
    const endY = 0;
    const radius = 300;
    var controlPoint1 = { x: centerX - radius, y: centerY / 2 };
    var controlPoint2 = { x: centerX + radius, y: centerY / 2 };

    const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: "our_services",
      //     start: "top top",
      //     end: "bottom bottom",
      //     pin: true,
      //     pinnedContainer: "#our_services_content",
      //     scrub: true,
      //   },
    });

    tl.fromTo(
      ".service-card",
      { x: startX, y: startY },
      {
        motionPath: {
          path: [
            controlPoint1,
            { x: centerX, y: centerY }, // Control Point 1
            controlPoint2,
            { x: endX, y: endY },
          ],
        },
        ease: "none",
        duration: 2,
        yoyo: true,
        repeat: -1,
      }
    );
  }, []);
  return (
    <section
      {...props}
      className={` text-white relative h-[100vh] flex justify-center items-center w-full z-[2]  bg-transparent  overflow-hidden`}
    >
      <div
        id="our_services_content"
        className={`relative h-[90vh] flex justify-center ${getResponsiveClasses()}`}
      >
        <div
          className={`absolute border border-white bottom-0 w-full h-1/2 max-w-5xl overflow`}
          ref={sliderContainerRef}
          id="service_slider"
        >
          <div className="absolute h-full w-1 bg-white left-1/2 -translate-x-1/2"></div>
          <div
            style={{
              width:
                ((sliderContainerRef.current?.clientWidth || 1260) / 3) *
                (3 / 5),
              height:
                ((sliderContainerRef.current?.clientWidth || 1260) / 3) *
                (3 / 5),
              transformOrigin: "bottom center",
            }}
            className="bg-blue-500 service-card bottom-0 left-0 absolute"
          ></div>
        </div>
        <div
          className={`w-full flex flex-col z-10 justify-between items-start h-full`}
        >
          <div className="flex justify-between gap-6 w-full">
            <div className="basis-1/2 shrink-0">
              <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit">
                Our Services
              </span>
              <p className="my-5 leading-relaxed text-5xl font-semibold font-orbit">
                Maximize{" "}
                <span className="text-primary inline-block " id="presence_text">
                  digital presence{" "}
                  <span className="ml-2 inline-block w-1 h-9 bg-primary type_cursor"></span>
                </span>{" "}
                with web, marketing, design.
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
    </section>
  );
}
