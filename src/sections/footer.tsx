import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export function Footer({}: HTMLProps<HTMLElement>) {
  return (
    <section className={`${getResponsiveClasses()} relative z-10 py-5`}>
      <div className="flex justify-between items-start pb-3 border-b border-white/45 flex-wrap text-white">
        <div className="flex-1">
          <img className="" src="./logo.png" alt="" />
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:underline">Our Story</li>
            <li className="cursor-pointer hover:underline">Contact</li>
            <li className="cursor-pointer hover:underline">News & Press</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:underline">info & vconekt</li>
            <li className="cursor-pointer hover:underline">+13108481237</li>
            <li className="cursor-pointer hover:underline">
              30 N GOULD ST STE 25084 SHERIDAN, WY 82801 
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-row-reverse gap-1 items-center">
          {[1, 2, 3].map((v) => (
            <img src="./footer_img.svg" className="w-16 h-16" key={v}></img>
          ))}
        </div>
      </div>
      <div className="py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <p className="text-white/65 hover:text-white hover:underline text-sm cursor-pointer">
            © 2024 Vconekt. All rights reserved.
          </p>
          <p className="text-white/65 hover:text-white hover:underline text-sm cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-white/65 hover:text-white hover:underline text-sm cursor-pointer">
            Terms and Conditions
          </p>
        </div>
        <div className="flex flex-1 flex-row-reverse items-center gap-3  text-primary">
          <FaFacebook className="hover:scale-110 transition-all duration-150 cursor-pointer" />
          <FaTiktok className="hover:scale-110 transition-all duration-150 cursor-pointer" />
          <FaInstagram className="hover:scale-110 transition-all duration-150 cursor-pointer" />
          <FaTwitter className="hover:scale-110 transition-all duration-150 cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
