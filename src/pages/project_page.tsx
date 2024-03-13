import { useParams } from "react-router-dom";
import { useRouteChange } from "../shared/hooks/useRouteChange";
import { useEffect,useRef, useState } from "react";
import { Project, ProjectCard, projects } from "./projects";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { ContactUs } from "../sections/contact_us";
export function ProjectPage() {
  const slug = useParams()["slug"];
  const navigate = useRouteChange();
  if (!slug) {
    navigate("/projects");
  }
  const [project, setProject] = useState<Project>();
  useEffect(() => {
    const projectToFind = projects.find((p) => p.slug === slug);
    if (projectToFind) setProject(projectToFind);
    else navigate("/projects");
  }, []);
  if (!project) return;
  //   console.log(project);
  return (
    <div className="pt-44 responsive relative z-[2] ">
      {/* Page Heading */}
      <div>
        <h2 className="large-heading uppercase text-white max-w-2xl leading-tight">
          {project.title}
        </h2>
        <div className="flex items-center gap-3 font-orbit font-medium my-4">
          <Link
            to={"/"}
            className="hover:underline cursor-pointer text-primary"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link to={"/projects"} className="hover:underline cursor-pointer">
            Projects
          </Link>
          <span className="text-primary">/</span>
          <Link
            to={`/projects/${slug}`}
            className="hover:underline cursor-pointer"
          >
            {project.title}
          </Link>
        </div>
      </div>
      {/* About */}
      <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2">
        {/* Involvements */}
        <div>
          <h3 className="xs-heading">Involvement</h3>
          <ul className="mt-2">
            {project.involvements.map((i, k) => (
              <li className="font-light" key={k}>
                {i}
              </li>
            ))}
          </ul>
          <p className="flex gap-2 items-center font-orbit text-primary text-xl pt-4">
            <span>Visit Website</span>
            <motion.a
              href={project.targetUrl}
              onClick={(e) => {
                e.stopPropagation();
                navigate(project.targetUrl);
              }}
              initial={{
                background:
                  "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
                color: "#fff",
              }}
              whileHover={{
                background:
                  "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
                color: "#000",
              }}
              className="p-1 rounded-full bg-transparent border  border-white hover:scale-110 transition-all duration-150"
            >
              <GoArrowRight className="-rotate-[30deg] text-lg" />
            </motion.a>
          </p>
        </div>
        {/* About Project */}
        <div>
          <h3 className="xs-heading">About Project</h3>
          <p className="font-light mt-2">{project.about}</p>
        </div>
      </div>

      {/* Slider */}
      <div>
        <AssetSlider samples={project.samples}></AssetSlider>
      </div>

      {/* Review */}
      <div className="my-20">
        <svg
          className="w-16 md:w-24"
          width="106"
          height="64"
          viewBox="0 0 106 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6362 64C15.4404 59.3753 18.0884 54.8252 19.5803 50.3497C20.9975 45.8741 21.7061 41.6224 21.7061 37.5944C19.17 37.5944 16.5966 37.4079 13.9858 37.035C11.3751 36.662 9.06277 36.0653 7.04879 35.2448C4.96021 34.4243 3.28189 33.38 2.01382 32.1119C0.671163 30.8438 -0.00016325 29.3147 -0.000163406 27.5245L-0.000164834 11.1888C-0.000165004 9.24943 0.671161 7.5711 2.01382 6.15386C3.28189 4.73661 4.96021 3.58043 7.04878 2.68532C9.13736 1.79022 11.487 1.11889 14.0977 0.671337C16.7085 0.223786 19.3192 7.52529e-06 21.9299 7.29705e-06C24.6898 7.05577e-06 27.4124 0.223785 30.0977 0.671336C32.7085 1.11889 35.0581 1.79022 37.1467 2.68532C39.2353 3.58043 40.9136 4.7366 42.1817 6.15385C43.4497 7.5711 44.0837 9.24942 44.0837 11.1888L44.0837 20.5874C44.0837 22.676 43.9719 25.5478 43.7481 29.2028C43.4497 32.9324 42.8157 36.8858 41.846 41.0629C40.8017 45.2401 39.3472 49.38 37.4824 53.4825C35.6176 57.5851 33.0441 61.0909 29.7621 64L11.6362 64ZM72.7271 64C76.5313 59.3753 79.2166 54.8252 80.7831 50.3497C82.2749 45.8741 83.0208 41.6224 83.0208 37.5944C80.4101 37.5944 77.7994 37.4079 75.1886 37.035C72.5779 36.662 70.2656 36.0653 68.2516 35.2448C66.163 34.4242 64.4847 33.38 63.2166 32.1119C61.9486 30.8438 61.3145 29.3147 61.3145 27.5245L61.3145 11.1888C61.3145 9.24942 61.9486 7.5711 63.2166 6.15385C64.4847 4.7366 66.163 3.58042 68.2516 2.68532C70.3402 1.79021 72.6898 1.11888 75.3005 0.671332C77.9113 0.22378 80.5593 2.17151e-06 83.2446 1.93675e-06C85.9299 1.70199e-06 88.6152 0.223779 91.3005 0.671331C93.9113 1.11888 96.2609 1.79021 98.3495 2.68531C100.438 3.58042 102.154 4.7366 103.496 6.15385C104.764 7.57109 105.398 9.24942 105.398 11.1888L105.398 20.5874C105.398 22.676 105.287 25.5478 105.063 29.2028C104.764 32.9324 104.13 36.8858 103.161 41.0629C102.116 45.2401 100.662 49.38 98.797 53.4825C96.9322 57.5851 94.3588 61.0909 91.0768 64L72.7271 64Z"
            fill="#B2E161"
            fillOpacity="0.19"
          />
        </svg>
        <div className="ml-16 md:ml-24">
          <p className="leading-snug text-2xl">{project.review.text}</p>
          <div className="mt-7 flex items-center gap-2">
            <img
              src={project.review.authorImage}
              alt=""
              className="h-20 w-auto"
            />
            <span className="flex flex-col justify-between gap-2 h-full">
              <h4 className="text-xl">{project.review.authorName}</h4>
              <p className="text-sm">{project.review.authorCompany}</p>
            </span>
          </div>
        </div>
      </div>

      {/* More Projects */}
      <div className="my-20">
        <h2 className="heading">More Projects</h2>
        <div className="my-2 flex gap-10 flex-col md:flex-row items-center">
          <ProjectCard></ProjectCard>
          <ProjectCard></ProjectCard>
        </div>
      </div>

      {/* CTA */}
      <div>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
}

export function AssetSlider({ samples }: { samples: Project["samples"] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  // const responsive = useResponsive();
  // const width = useMemo(() => {
  //   return getResponsiveWidth();
  // }, [responsive]);
  if (samples.length <= 0) return null;
  return (
    <div className="my-10">
      <div
        ref={sliderRef}
        className="aspect-[1.98/1] p-0 flex responsive w-full  overflow-x-auto no-scrollbar snap-mandatory snap-x ease-in-out duration-150 scroll-smooth"
      >
        {samples.map((sample, index) => {
          let align = "center";
          if (index === 0) align = "start";
          if (index === samples.length - 1) align = "end";
          return (
            <div
              key={index}
              style={{ scrollSnapAlign: align }}
              className="basis-full h-full w-full shrink-0 flex justify-center items-center"
            >
              {sample.type === "image" ? (
                <SliderImage sample={sample}></SliderImage>
              ) : (
                <SliderVideo sample={sample}></SliderVideo>
              )}
            </div>
          );
        })}
      </div>
      <SliderNavigator
        samples={samples}
        sliderRef={sliderRef}
      ></SliderNavigator>
    </div>
  );
}

export function SliderNavigator({
  sliderRef,
  samples,
}: {
  sliderRef: React.RefObject<HTMLDivElement>;
  samples: Project["samples"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollToSample = (index: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scroll({
      left: sliderRef.current.clientWidth * index,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (!sliderRef.current) return;
    const ev = () => {
      if (!sliderRef.current) return;
      const index = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      );
      setActiveIndex(index);
    };
    sliderRef.current.onscrollend = ev;
    return () => {
      sliderRef.current?.removeEventListener("scrollend", ev);
    };
  }, [sliderRef.current]);
  return (
    <div className="flex justify-center items-center gap-3 my-5">
      {samples.map((_, i) => (
        <div
          key={i}
          onClick={() => scrollToSample(i)}
          className={`w-4 h-4 rounded-full border ${
            activeIndex === i ? "bg-primary boder-primary" : "border-white"
          } transition-all duration-500 ease-in-out cursor-pointer`}
        ></div>
      ))}
    </div>
  );
}

export function SliderImage({ sample }: { sample: Project["samples"][0] }) {
  return (
    <img src={sample.src} className="h-full w-auto aspect-auto max-w-full" />
  );
}

export function SliderVideo({ sample }: { sample: Project["samples"][0] }) {
  return (
    <video
      src={sample.src}
      autoPlay
      muted
      loop
      className="h-full w-auto aspect-auto max-w-full"
    ></video>
  );
}
