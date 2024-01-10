import { HTMLProps, useRef } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaStar } from "react-icons/fa";
import { V3dAboutUS } from "../components/3dLogoInAboutUs";

export function AboutUs({ ...props }: HTMLProps<HTMLElement>) {
  const vidContainerRef = useRef<HTMLDivElement>(null);
  const contenRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2-content-wrapper",
        start: "top top",
        endTrigger: `#${props.id}` || "#about_us",

        end: "bottom bottom",
        pin: true,
        scrub: true,
        onLeave: () => {
          contenRef.current?.classList.remove("reflected");
          gsap.set("#section2-content", { backgroundColor: "transparent" });
        },
        onEnterBack: () => {
          // Add the class 'z-10' when leaving the viewport
          // Remove the class 'z-0' if it was previously added
          contenRef.current?.classList.add("reflected");
        },

        // markers: true,
      },
    });
    tl.to("#section2-content", {
      translateZ: 0,
      rotateY: 0,
      opacity: 1,
      backgroundColor: "black",
      borderRadius: 0,
    });
  }, []);

  return (
    <section
      {...props}
      className={`relative w-full h-[250vh] z-[2] flex bg-transparent justify-start ${getResponsiveClasses()}`}
    >
      <div
        id="section2-content-wrapper"
        className="h-screen w-full perspective-container flex justify-center items-center"
      >
        <div
          style={{ backgroundColor: "#333333", borderRadius: "50px" }}
          id="section2-content"
          ref={contenRef}
          className="w-full h-[85vh] flex justify-center gap-5 items-start relative p-5 reflected"
        >
          <V3dAboutUS scale={0.7} parentRef={contenRef} />
          <div className="basis-1/2 shrink-0">
            <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
              About Us
            </span>
            <h2 className="text-4xl  md:text-5xl font-mono font-semibold uppercase text-white my-3">
              EMPOWERING DIGITAL GROWTH WITH 5 YEARS VCONeKT LLC IT SOLUTIONS
              EXPERTISE
            </h2>
          </div>
          <div ref={vidContainerRef}>
            <div
              style={{
                width: "100%",
                height: vidContainerRef.current?.clientWidth
                  ? vidContainerRef.current?.clientWidth / 1.94
                  : "auto",
              }}
              className="basis-1/2 shrink-0"
            >
              <div className="relative">
                <span className="absolute-centered">
                  <span className="flex justify-center items-center rounded-full cursor-pointer bg-primary/40 text-primary p-7">
                    <svg
                      width="28"
                      height="32"
                      viewBox="0 0 28 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.5 15.134C28.1667 15.5189 28.1667 16.4811 27.5 16.866L2 31.5885C1.33333 31.9734 0.499998 31.4922 0.499999 30.7224L0.5 1.27757C0.5 0.507767 1.33333 0.0266411 2 0.411541L27.5 15.134Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </span>
                <img
                  className="object-cover w-full h-full object-center rounded-2xl"
                  src="https://picsum.photos/538/277?grayscale"
                  alt=""
                />
              </div>
            </div>
            <p className="py-2 font-thin text-white  text-sm">
              Vconket LLC is an IT agency in Wyoming, USA specializing in UI/UX,
              graphic designing, WordPress development, SEO, and social media
              management. Our mission is to help businesses grow with
              exceptional IT services.
            </p>
            <ul className="my-1 mb-2 ">
              {[
                "Web Design & Development",
                "Improve online visibility, traffic, and rankings",
                "Graphics & UI/ UX Design",
                "Social Media Marketing",
              ].map((text, index) => (
                <li key={index} className="flex items-center gap-1 my-1">
                  <img src="/check_li_icon.png" height={17} width={17} alt="" />
                  <span className="text-white text-sm font-thin">{text}</span>
                </li>
              ))}
            </ul>
            <span className="bg-[#191919] -skew-x-[30deg] block w-fit py-1 px-5">
              <span className="flex justify-center items-center skew-x-[30deg] w-fit gap-2">
                <img src="/rating_icon.png" width={20} alt="" />
                <span className="text-lg text-white">5.0</span>
                <span className="flex justify-center items-center gap-1">
                  <FaStar className="text-[#FF3D2E]" />
                  <FaStar className="text-[#FF3D2E]" />
                  <FaStar className="text-[#FF3D2E]" />
                  <FaStar className="text-[#FF3D2E]" />
                  <FaStar className="text-[#FF3D2E]" />
                </span>
              </span>
            </span>
            <span className="text-white font-thin text-sm">
              <span className="text-primary">Vision:</span> Our vision at
              Vconket LLC is to empower businesses with innovative IT solutions
              that unlock their full potential in the digital world.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
