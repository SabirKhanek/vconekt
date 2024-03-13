import { createPortal } from "react-dom";
import { useNavSwitch } from "../shared/contexts/navSwitch";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MenuButton } from "./MenuButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navlinks } from "./nav";
import { NavHashLink } from "react-router-hash-link";
import { RESOURCE_STATUS, usePreloader } from "../shared/contexts/preloader";

export interface MobileNavProps {}

export function MobileNav({ ...props }: MobileNavProps) {
  return createPortal(
    <Nav {...props}></Nav>,
    document.getElementById("mobile-nav")!
  );
}

function Nav({ ...props }: MobileNavProps) {
  const nav = useNavSwitch();
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (nav.isNavOpened)
      document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
    else
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
  }, [nav.isNavOpened]);

  useGSAP(() => {
    if (!navRef.current) return;
    const tl = gsap.timeline({});

    if (nav.isNavOpened) {
      tl.to(navRef.current, {
        delay: 0.5,
        duration: 0.2,
        top: "0",
      });
      tl.to(buttonRef.current, { duration: 0.1, opacity: 1 });
      tl.to(".mobile_nav_text", {
        opacity: 1,
        duration: 0.2,
        y: "0",
        rotateZ: 0,
        stagger: 0.05,
      });
    } else {
      tl.to(".mobile_nav_text", {
        opacity: 0,
        y: "-100%",
        rotateZ: -15,
        stagger: 0.05,
        duration: 0.2,
      });
      tl.to(buttonRef.current, { duration: 0.1, opacity: 0 });
      tl.to(navRef.current, {
        duration: 0.2,
        top: "-100vh",
      });
    }
  }, [nav.isNavOpened, navRef.current]);
  const preloader = usePreloader();
  props;
  return (
    <motion.div
      style={{
        zIndex: 20,
        background: "rgba(0, 0, 0, 0.64)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        top: "-100vh",
        // backdropFilter: "blur(12.1px)",
      }}
      // animate={{ top: nav.isNavOpened ? "0" : "-100vh" }}
      className="absolute 843:hidden top-0 left-0 backdrop-filter-wkit bg-black  h-screen overflow-y-auto w-full"
      ref={navRef}
    >
      <button
        ref={buttonRef}
        onClick={() => nav.switchNav(!nav.isNavOpened)}
        className="!rounded-full  bg-white absolute right-5 top-5 flex justify-center items-center p-3"
      >
        <span className="inline-flex w-4 h-4 justify-center items-center">
          <MenuButton
            isOpen={nav.isNavOpened}
            strokeWidth="1.5"
            color="#000000"
            transition={{ ease: "easeOut", duration: 0.2 }}
            width="16"
            height="12"
          />
        </span>
      </button>
      <div className="p-10 pt-[20vh]">
        <h2 className="text-5xl flex flex-col gap-4 text-white font-orbit font-semibold">
          {navlinks.map((link, i) => {
            return (
              <span key={i} className="inline-block overflow-hidden py-1">
                <NavHashLink
                  key={link.route}
                  to={link.route}
                  onClick={() => {
                    preloader.registerResource("routeChange");
                    preloader.updateStatus(
                      "routeChange",
                      RESOURCE_STATUS.LOADING
                    );
                    setTimeout(() => {
                      preloader.updateStatus(
                        "routeChange",
                        RESOURCE_STATUS.LOADED
                      );
                    }, 1000);
                  }}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary" : "text-white"
                    } hover:text-primary/65 origin-bottom-left mobile_nav_text inline-block transition-all relative duration-150  cursor-pointer`
                  }
                >
                  {link.name}
                </NavHashLink>
              </span>
            );
          })}
        </h2>
      </div>
    </motion.div>
  );
}
