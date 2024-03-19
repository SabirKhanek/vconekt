import { HTMLProps, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { AnimatedText } from "../components/animated_text";
import FadingImage from "./fadingImage";

export default function Testimonial({ ...props }: HTMLProps<HTMLElement>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const isInView = useInView(ref);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInView) handleNext((activeIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleNext = (index: number) => {
    if (index < 0 || index >= quotes.length) return;
    if (index === activeIndex) return;
    setActiveIndex(index);
  };
  return (
    <motion.section
      style={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      ref={ref}
      {...(props as any)}
      className={`${getResponsiveClasses()} transition-all  z-[2] duration-300 mt-28 my-10 w-full relative`}
    >
      <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
        Testimonial
      </span>
      <p
        className="font-orbit font-semibold heading text-white mt-5"
        style={{ textTransform: "capitalize" }}
      >
        They say we're good for a reason
      </p>
      <div className="grid grid-cols-1 mt-7 md:grid-cols-[4fr_6fr]  gap-3 text-white">
        <div className="w-full flex justify-center items-center overflow-hidden">
          <FadingImage
            className="aspect-[1.98/1.3]  rounded-xl"
            src={quotes[activeIndex].img_src}
          />
        </div>
        <div className="flex-1 relative justify-between flex gap-1">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <svg
                  width="106"
                  height="64"
                  viewBox="0 0 106 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6364 64C15.4406 59.3753 18.0886 54.8252 19.5804 50.3497C20.9977 45.8741 21.7063 41.6224 21.7063 37.5944C19.1702 37.5944 16.5968 37.4079 13.986 37.035C11.3753 36.662 9.06296 36.0653 7.04897 35.2448C4.96039 34.4243 3.28207 33.38 2.014 32.1119C0.671346 30.8438 1.98559e-05 29.3147 1.96994e-05 27.5245L1.82713e-05 11.1888C1.81017e-05 9.24943 0.671344 7.5711 2.014 6.15386C3.28207 4.73661 4.96039 3.58043 7.04897 2.68532C9.13754 1.79022 11.4872 1.11889 14.0979 0.671337C16.7086 0.223786 19.3194 7.52529e-06 21.9301 7.29705e-06C24.69 7.05577e-06 27.4126 0.223785 30.0979 0.671336C32.7086 1.11889 35.0583 1.79022 37.1469 2.68532C39.2354 3.58043 40.9138 4.7366 42.1818 6.15385C43.4499 7.5711 44.0839 9.24942 44.0839 11.1888L44.0839 20.5874C44.0839 22.676 43.972 25.5478 43.7483 29.2028C43.4499 32.9324 42.8159 36.8858 41.8462 41.0629C40.8019 45.2401 39.3473 49.38 37.4825 53.4825C35.6177 57.5851 33.0443 61.0909 29.7623 64L11.6364 64ZM72.7273 64C76.5315 59.3753 79.2168 54.8252 80.7832 50.3497C82.2751 45.8741 83.021 41.6224 83.021 37.5944C80.4103 37.5944 77.7996 37.4079 75.1888 37.035C72.5781 36.662 70.2658 36.0653 68.2518 35.2448C66.1632 34.4242 64.4849 33.38 63.2168 32.1119C61.9487 30.8438 61.3147 29.3147 61.3147 27.5245L61.3147 11.1888C61.3147 9.24942 61.9487 7.5711 63.2168 6.15385C64.4849 4.7366 66.1632 3.58042 68.2518 2.68532C70.3403 1.79021 72.69 1.11888 75.3007 0.671332C77.9114 0.22378 80.5595 2.17151e-06 83.2448 1.93675e-06C85.9301 1.70199e-06 88.6154 0.223779 91.3007 0.671331C93.9114 1.11888 96.2611 1.79021 98.3497 2.68531C100.438 3.58042 102.154 4.7366 103.497 6.15385C104.765 7.57109 105.399 9.24942 105.399 11.1888L105.399 20.5874C105.399 22.676 105.287 25.5478 105.063 29.2028C104.765 32.9324 104.131 36.8858 103.161 41.0629C102.117 45.2401 100.662 49.38 98.7972 53.4825C96.9324 57.5851 94.359 61.0909 91.0769 64L72.7273 64Z"
                    fill="#B2E161"
                    fillOpacity="0.19"
                  />
                </svg>
              </div>
              <AnimatedText
                text={quotes[activeIndex].quote_text || "This is a sample text"}
                className="text-white min-h-[100px] my-2 text-3xl quote_text"
              />
            </div>

            <div>
              <AnimatedText
                className="text-white font-light text-xl"
                text={quotes[activeIndex].author}
              />
              <AnimatedText
                className="text-white font-thin"
                text={quotes[activeIndex].author_title}
              />
            </div>
          </div>
          <div className="self-end flex gap-2">
            <motion.button
              initial={{
                background:
                  "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
                scale: 1,
              }}
              whileHover={{
                background:
                  "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
                scale: 1.2,
                color: "#000",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-2 border border-white rounded-full"
              onClick={() => handleNext(activeIndex - 1)}
            >
              <GoArrowLeft />
            </motion.button>
            <motion.button
              initial={{
                background:
                  "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
                scale: 1,
              }}
              whileHover={{
                background:
                  "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
                scale: 1.2,
                color: "#000",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-2 border border-white rounded-full"
              onClick={() => handleNext(activeIndex + 1)}
            >
              <GoArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const quotes = [
  {
    quote_text: `They know their stuff, and we are currently using them for more projects.`,
    author: "John Doe",
    author_title: "Director Fast Track Training",
    img_src: "/testimonial_1.jpg",
  },
  {
    quote_text: `Yeah this is another text yayy.!`,
    author: "Johnson Smith",
    author_title: "Director Vconekt",
    img_src: "/testimonial_2.jpg",
  },
];
