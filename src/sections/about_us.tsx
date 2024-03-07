import React, { HTMLProps, useRef } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaStar } from "react-icons/fa";
import { V3dAboutUS } from "../components/3dLogoInAboutUs";
import { motion } from "framer-motion";
import { AnimatedList } from "../components/animatedList";
export const AboutUs = React.memo(
  ({
    doAnimate,
    ...props
  }: HTMLProps<HTMLElement> & { doAnimate?: boolean }) => {
    const vidContainerRef = useRef<HTMLDivElement>(null);
    const contenRef = useRef<HTMLDivElement>(null);
    const animateTarget = {
      transform: "perspective(1000px) rotateY(0deg) translateZ(0)",
      opacity: 1,
      backgroundColor: "#00000000",
      borderRadius: 0,
    };
    useGSAP(() => {
      if (doAnimate) {
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
              contenRef.current?.classList.add("reflected");
            },
          },
        });
        tl.to("#section2-content", animateTarget);
      } else {
        gsap.set("#section2-content", animateTarget);
      }
    }, []);
    return (
      <section
        {...props}
        className={`relative w-full ${
          doAnimate ? "h-[250vh]" : "h-screen"
        } z-[2] flex bg-transparent justify-start ${getResponsiveClasses()}`}
      >
        <div
          id="section2-content-wrapper"
          className="h-screen w-full flex justify-center items-center"
        >
          <div
            style={{ backgroundColor: "#333333", borderRadius: "50px" }}
            id="section2-content"
            ref={contenRef}
            className="w-full  flex justify-center transform- gap-5 items-start relative p-5 reflected"
          >
            <V3dAboutUS scale={0.7} parentRef={contenRef} />
            <div className="basis-1/2 shrink-0">
              <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
                About Us
              </span>
              <h2 className="leading-relaxed  md:text-[40px] xl:text-5xl font-orbit font-semibold uppercase text-white my-3">
                Vconekt LLC: Igniting Innovation, Empowering Transformation.
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
                At Vconekt LLC, we are more than just a technology company - we
                are architects of innovation, proactive IT support for
                businesses, champions of transformation, and your trusted
                partner in the digital realm. With over 5 years of experience in
                the industry, we have honed our expertise to deliver
                unparalleled solutions and consulting services that drive
                success for businesses worldwide.
              </p>

              <AnimatedList
                items={[
                  "Web Design & Development",
                  "SEO & Digital Marketing",
                  "Digital Transformation Consulting",
                  "Custom Software Development",
                ]}
              />
              <span className="bg-[#191919] -skew-x-[30deg] mt-3 block w-fit py-1 px-5">
                <span className="flex justify-center items-center skew-x-[30deg] w-fit gap-2">
                  <img src="/rating_icon.png" width={20} alt="" />
                  <span className="text-lg text-white">5.0</span>
                  <motion.div className="flex justify-center items-center gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => {
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{
                            opacity: 1,
                            transition: { duration: 0.2, delay: i * 0.2 },
                          }}
                        >
                          <FaStar className="text-[#FF3D2E]" />
                        </motion.span>
                      );
                    })}
                  </motion.div>
                </span>
              </span>
              <span className="text-white font-thin text-sm">
                <span className="text-primary">Vision:</span> Innovating
                limitless possibilities, we redefine the digital landscape with
                IT support tailored to business needs, empowering businesses to
                thrive through visionary strategies and innovative solutions at
                our core.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
