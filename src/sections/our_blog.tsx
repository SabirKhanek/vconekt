import { HTMLProps, useRef } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "../components/button";
import { GoArrowRight } from "react-icons/go";
import { motion, useInView } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePreloader } from "../shared/contexts/preloader";
import { useRouteChange } from "../shared/hooks/useRouteChange";

interface Blogs extends HTMLProps<HTMLElement> {
  onPage?: boolean;
}

export function OurBlog({ onPage = false, ...props }: Blogs) {
  const preloader = usePreloader();
  useGSAP(() => {
    const containers = Array.from(
      document.getElementsByClassName("blog_image_container")
    );

    containers.forEach((container) => {
      gsap.to(container.children[0], {
        y: "-30%",
        scrollTrigger: {
          trigger: container,
          endTrigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, [preloader.isLoaded]);
  const navigate = useRouteChange();
  return (
    <motion.section
      {...(props as any)}
      className={`${getResponsiveClasses()} my-10 w-full relative z-10`}
    >
      {!onPage ? (
        <div className="relative">
          <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
            Our Blog
          </span>
          <div className="flex flex-col gap-1">
            <p
              className="font-orbit font-semibold  heading text-white mt-5 max-lm:!text-[34px] max-lm:!max-h-full !leading-tight text-[5vw]"
              style={{ textTransform: "capitalize" }}
            >
              WE DO AWESOME CONTRIBUTE FOR OUR CLIENTS. CHECK SOME OF LATEST
              NEWS.
            </p>
            <Button
              onClick={() => navigate("/blogs")}
              className="sm:hidden w-fit"
            >
              View All
            </Button>
          </div>
          <Button
            onClick={() => navigate("/blogs")}
            className="absolute !hidden sm:!flex bottom-0 right-0"
          >
            View All
          </Button>
        </div>
      ) : (
        <div className="max-w-[80%] w-full mb-16">
          <h2 className="font-orbit heading">
            Illuminating the Digital{" "}
            <span className="text-primary">Landscape</span>
          </h2>
          <p className="max-w-[350px] text-sm font-light">
            Discover the fusion of art, tech, and strategy that drives our
            immersive brand experiences. Your sneak peek into tomorrow's digital
            landscape starts here.
          </p>
        </div>
      )}
      <ul className="my-4 text-white">
        {[1, 2, 3, 4].map((v) => (
          <BlogCard key={v} />
        ))}
      </ul>
      {onPage && (
        <div className="my-10 flex justify-center items-center">
          <Button>Load More</Button>
        </div>
      )}
    </motion.section>
  );
}

function BlogCard() {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.li
      ref={ref}
      style={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      className="border-collapse duration-200 transition-all border-white border-t border-b"
    >
      <div className="py-6  flex flex-col md:flex-row gap-4">
        <div className="blog_image_container w-full md:w-[387px] h-[264px] shrink-0 overflow-hidden">
          <img
            className="blog_images object-cover object-top h-[140%] w-full cursor-pointer"
            src={`https://picsum.photos/387/369?q=${Math.random()}`}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between items-start gap-7">
            <h2 className="font-orbit text-[36px] text-primary text-wrap small-heading cursor-pointer font-semibold hover:underline">
              7 ESSENTIAL STEPS FOR A ROBUST IT STRATEGY: THE ULTIMATE GUIDE
            </h2>
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
              className="p-3 hidden lg:flex 520:flex 768:hidden rounded-full bg-transparent border border-white hover:scale-110 transition-all duration-150"
            >
              <GoArrowRight className="-rotate-[30deg] text-3xl" />
            </motion.button>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm text-white font-light">Agency</span>
              <span className="text-sm text-white font-light">Branding</span>
            </div>
            <span className="text-sm text-white/50">16 January, 2023</span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
