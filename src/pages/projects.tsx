import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../components/button";
import useHover from "../shared/hooks/useHover";
import { GoArrowRight } from "react-icons/go";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouteChange } from "../shared/hooks/useRouteChange";

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
        <div className="flex flex-col 520:flex-row gap-10 my-3 mb-10">
          {[1, 2].map((v) => {
            return (
              <div
                key={v}
                className={`flex flex-col gap-10 flex-1 ${
                  v === 2 ? "520:-translate-y-[75px]" : ""
                }`}
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
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hovered = useHover(ref);
  const hoveredButton = useHover(buttonRef);
  useGSAP(() => {
    const but = buttonRef.current;
    if (!but) return;
    const tl = gsap.timeline();
    tl.to(but, {
      x: hovered.cursorX - but.clientWidth / 2,
      y: hovered.cursorY - but.clientHeight / 2,
      scale: hoveredButton.isHovered ? 1.2 : hovered.isHovered ? 1 : 0,
      ease: "none",
      duration: 0.005,
    });
  }, [hovered]);
  const navigate = useRouteChange();
  return (
    <motion.a
      ref={ref}
      href="/projects/best_guitar_instruments"
      onClick={(e) => {
        e.preventDefault();
        navigate("/projects/best_guitar_instruments");
      }}
      style={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      className="flex relative flex-col w-full gap-3 transition-all duration-500 ease-in-out"
    >
      <div
        ref={imageRef}
        className="w-full cursor-pointer group relative justify-self-start self-start "
      >
        <div className="overflow-hidden">
          <img
            src={`https://picsum.photos/500?q=${Math.random()}`}
            className="w-full aspect-[1.1608/1] object-cover group-hover:scale-110 over transition-all duration-200 ease-in-out"
            alt=""
          />
        </div>
        {
          <motion.button
            ref={buttonRef}
            initial={{
              background:
                "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
            }}
            whileHover={{
              background:
                "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
              color: "#000",
            }}
            className="p-3 absolute left-0 top-0 rounded-full bg-transparent border border-white hover:scale-110 transition-all duration-150"
          >
            <GoArrowRight className="-rotate-[30deg] text-3xl" />
          </motion.button>
        }
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
    </motion.a>
  );
}

export interface Project {
  title: string;
  slug: string;
  involvements: string[];
  targetUrl: string;
  about: string;
  mainThumb: { src: string; type: "image" };
  samples: { src: string; type: "image" | "video" }[];
  review: {
    authorName: string;
    authorImage: string;
    authorCompany: string;
    text: string;
  };
}

export const projects: Project[] = [
  {
    title: "Best Guitar Instruments",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    involvements: ["Mobile App", "Web App", "E-commerce"],
    mainThumb: {
      src: `https://picsum.photos/590/443?t=${Math.random()}`,
      type: "image",
    },
    review: {
      text: "Olga is one of the smartest designers I have ever worked with. One of her outstanding skills as a designer is that she is a great listener. She will take client requirements and expertly solve complex problems. She can take her vast design experience and combine it with technology to come up with fantastic designs on point, and on time. Her many award winning designs speak for her talent and process.",
      authorCompany: "Director Fast Track Company",
      authorImage: `https://picsum.photos/80?t=${Math.random()}`,
      authorName: "John Doe",
    },
    samples: [
      { src: "/vconekt_about_us.mp4", type: "video" },
      {
        src: `https://picsum.photos/1200/592?t=${Math.random()}`,
        type: "image",
      },
    ],
    slug: "best_guitar_instruments",
    targetUrl: "#",
  },
];
