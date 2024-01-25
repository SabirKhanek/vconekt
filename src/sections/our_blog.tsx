import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "../components/button";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";

export function OurBlog({ ...props }: HTMLProps<HTMLElement>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...(props as any)}
      className={`${getResponsiveClasses()} mt-28 my-10 w-full relative`}
    >
      <div className="relative">
        <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
          Our Blog
        </span>
        <p
          className="font-orbit font-semibold text-[55px] text-white mt-5"
          style={{ textTransform: "capitalize" }}
        >
          WE DO AWESOME CONTRIBUTE FOR OUR CLIENTS. CHECK SOME OF LATEST NEWS.
        </p>
        <Button className="absolute bottom-0 right-0">View All</Button>
      </div>
      <ul className="my-4 text-white">
        {[1, 2, 3, 4].map((v) => (
          <motion.li
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            key={v}
            className="border-collapse border-white border-t border-b"
          >
            <div className="py-6  flex gap-4">
              <img src={`https://picsum.photos/387/264?q=${v}`} alt="" />
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-start gap-7">
                  <h2 className="font-orbit text-[36px] text-primary text-wrap font-semibold hover:underline">
                    7 ESSENTIAL STEPS FOR A ROBUST IT STRATEGY: THE ULTIMATE
                    GUIDE
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
                    className="p-3 rounded-full bg-transparent border border-white hover:scale-110 transition-all duration-150"
                  >
                    <GoArrowRight className="-rotate-[30deg] text-3xl" />
                  </motion.button>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white font-light">
                      Agency
                    </span>
                    <span className="text-sm text-white font-light">
                      Branding
                    </span>
                  </div>
                  <span className="text-sm text-white/50">
                    16 January, 2023
                  </span>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
