import { useGSAP } from "@gsap/react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
export function OurWorkProcess() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  useGSAP(() => {
    new SplitType("#process_text", {
      types: ["chars", "words"],
      charClass: "process_text_letter",
      wordClass: "break-none",
    });
    const tl = gsap.timeline({});
    tl.fromTo(
      ".process_text_letter",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.01,
        stagger: 0.03,
      }
    );
  }, [isInView]);
  return (
    <section
      ref={ref}
      className={`${getResponsiveClasses()} relative z-[3] my-10`}
    >
      <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit">
        Our Work Process
      </span>
      <h2 className="heading text-white max-w-[80%] my-3" id="process_text">
        Navigating Through Our Seamless Work{" "}
        <span className="text-primary">Process</span>
      </h2>

      <div className="mt-7 grid grid-cols-3 gap-4">
        {process.map((v, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.4, delay: 0.5 * i },
              }}
              key={i}
              className="flex gap-3 items-start"
            >
              <span className="text-primary font-orbit font-semibold">
                0{i + 1}
              </span>
              <div>
                <h1 className="font-orbit text-2xl font-semibold">{v.name}</h1>
                <div className="flex flex-col gap-3 mt-3">
                  {v.substeps.map((sv, si) => {
                    return (
                      <div key={si}>
                        <h2 className="font-orbit font-bold">{sv.name}</h2>
                        <p className="text-sm font-light">{sv.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const process = [
  {
    name: "Immersion",
    substeps: [
      {
        name: "Understanding",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
      {
        name: "Alignment",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
    ],
  },
  {
    name: "Creation",
    substeps: [
      {
        name: "Planning",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
      {
        name: "Design",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
    ],
  },
  {
    name: "Build",
    substeps: [
      {
        name: "Production",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
      {
        name: "Delivery",
        desc: "Conducting an initial workshop with the client leaders to Understand the project vision and requirements.",
      },
    ],
  },
];
