import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
// import { getResponsiveWidth } from "../shared/constants/getResponsiveClasses";

export function AboutUsVideo() {
  const videoContainer = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!videoContainer.current) return;
    if (!scrollContainer.current) return;
    gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: "top top",
        // markers: true,
        pin: true,
        pinSpacing: false,
        pinnedContainer: videoContainer.current,
        end: "bottom bottom",
      },
    });
  }, [videoContainer.current, scrollContainer.current]);
  return (
    <div ref={scrollContainer} className="h-[300vh]">
      <div
        ref={videoContainer}
        style={{}}
        className={`responsive relative aspect-[1.98/1] w-full`}
      >
        <video
          src="/vconekt_about_us.mp4"
          muted
          autoPlay
          loop
          // controls
          width={"100%"}
          height={"100%"}
        ></video>
      </div>
    </div>
  );
}
