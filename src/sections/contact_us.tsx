import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { MdOutlineMail } from "react-icons/md";

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
        <span className="text-center text-3xl text-white font-orbit">
          LET'S CONNECT AND GROW YOUR BUSINESS TOGETHER:
        </span>
        <div className="relative h-28 w-full">
          <V3dContactUs scale={0.3} />
          <button className="rounded-full  w-14 h-14 absolute-centered border border-primary p-0.5">
            <div className="rounded-full w-full h-full border border-black">
              <div className="bg-white hover:bg-transparent transition-all duration-500 border border-white rounded-full flex justify-center items-center text-black h-full w-full">
                <MdOutlineMail />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
