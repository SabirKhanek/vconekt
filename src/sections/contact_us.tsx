import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { MdOutlineMail } from "react-icons/md";
import { motion } from "framer-motion";
export function ContactUs({ ...props }: HTMLProps<HTMLElement>) {
  return (
    <section
      {...props}
      className={` text-white relative h-screen w-full z-[2]  bg-transparent  ${getResponsiveClasses()}`}
    >
      <div className="absolute-centered rounded-3xl border w-full flex flex-col justify-center items-center border-white/65 px-20 py-10 gap-3">
        <span className="rounded-3xl text-xs bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
          Contact Us
        </span>
        <span className="text-center font-bold text-3xl text-white font-orbit">
          LET'S CONNECT AND GROW YOUR BUSINESS TOGETHER
        </span>
        <div className="relative h-44 w-full">
          <V3dContactUs scale={0.45} />
          <motion.button
            initial={{
              background:
                "radial-gradient(circle closest-side, #fff 0%, transparent 0%)",
              scale: 1,
              transform: "translateX(-50%) translateY(-50%)",
            }}
            whileHover={{
              background:
                "radial-gradient(circle closest-side, #fff 100%, transparent 100%)",
              scale: 1.2,
              color: "#000",
              transform: "translateX(-50%) translateY(-50%)",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-full  w-14 h-14 absolute-centered border border-primary p-2 flex justify-center items-center"
          >
            <MdOutlineMail />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
