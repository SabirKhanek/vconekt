import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "../components/button";
import useHover from "../shared/hooks/useHover";
import { GoArrowRight } from "react-icons/go";
import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

export function Projects() {
  return (
    <>
      <div className="flex justify-center items-center flex-col z-[2] text-white relative  gap-4 pt-36 pb-24">
        <div className="relative flex justify-center flex-col items-center h-64">
          <V3dContactUs scale={0.7} />

          <div className="flex relative z-10 justify-center items-center flex-col gap-4">
            <h2 className="heading uppercase ">Projects</h2>
            <div className="flex items-center gap-3 font-orbit font-medium ">
              <Link
                to={"/"}
                className="hover:underline cursor-pointer text-primary"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link to={"/about_us"} className="hover:underline cursor-pointer">
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[2] responsive">
        <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
          Projects
        </span>
        <h2 className="heading">
          Explore Our Diverse Portfolio of Success{" "}
          <span className="text-primary">Stories</span>
        </h2>
        <div className="flex gap-10 my-3 mb-10">
          {[1, 2].map((v) => {
            return (
              <div
                key={v}
                style={{ transform: v === 2 ? "translateY(-75px)" : "" }}
                className="flex flex-col gap-10 flex-1"
              >
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
              </div>
            );
          })}
        </div>
        <hr className="max-w-2xl mx-auto my-0 bg-white/30 h-0.5 mb-5" />
        <div className="flex justify-center items-center my-10">
          <Button>Load More</Button>
        </div>
      </div>
    </>
  );
}

export function ProjectCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const imageRef = useRef<HTMLDivElement>(null);
  const hovered = useHover(ref);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useGSAP(() => {
    const but = buttonRef.current;
    if (!but) return;
    // const tl = gsap.timeline();
    // tl.to(but, {
    //   left: hovered.cursorX,
    //   top: hovered.cursorY,
    // }).fromTo(
    //   but,
    //   {
    //     background:
    //       "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
    //     scale: 1,
    //   },
    //   {
    //     x: "-50%",
    //     y: "-50%",
    //     background:
    //       "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
    //     scale: 1.2,
    //     color: "#000",
    //   }
    // );
  }, [hovered]);
  useEffect(() => {}, [hovered]);
  return (
    <motion.div
      ref={ref}
      style={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      className="flex relative flex-col w-full gap-3 transition-all duration-500 ease-in-out"
    >
      <div
        ref={imageRef}
        className="w-full cursor-pointer group relative justify-self-start self-start overflow-hidden"
      >
        <img
          src={`https://picsum.photos/500?q=${Math.random()}`}
          className="w-full aspect-[1.1608/1] object-cover group-hover:scale-110 transition-all duration-200 ease-in-out"
          alt=""
        />
        {hovered.isHovered && (
          <motion.button
            ref={buttonRef}
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
            style={{
              left:
                hovered.cursorX - (buttonRef.current?.clientWidth || 50) / 2,
              top:
                hovered.cursorY - (buttonRef.current?.clientHeight || 50) / 2,
            }}
            className="p-3 absolute rounded-full bg-transparent border border-white hover:scale-110 transition-all duration-150"
          >
            <GoArrowRight className="-rotate-[30deg] text-3xl" />
          </motion.button>
        )}
      </div>

      <div>
        <h2 className="font-orbit font-semibold text-3xl">
          Best Guitar Instruments
        </h2>
        <p className="text-sm font-light">
          We design an affiliate website for best guitar instruments. Best
          Guitar Instruments provides top-quality guitars that sound amazing.
        </p>
      </div>
    </motion.div>
  );
}
