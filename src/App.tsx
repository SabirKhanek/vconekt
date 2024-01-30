import { Navbar } from "./components/nav";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import { Hero } from "./sections/hero.js";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);
import "./App.css";
import { AboutUs } from "./sections/about_us.js";
import { V3d } from "./components/3dLogo.js";
import { FluidCursor } from "./components/fluidCursor.jsx";
import { Preloader } from "./components/preloader.js";
import { NeedHelp } from "./sections/need_help.js";
import { CompletedStories } from "./sections/completed_stories.js";
import { ContactUs } from "./sections/contact_us.js";
import { RecentWork } from "./sections/recent_work.js";
import { OurServices } from "./sections/our_service.js";
import { OurBlog } from "./sections/our_blog.js";
import Testimonial from "./sections/testimonial.js";
import { motion } from "framer-motion";
export default function App() {
  let smoother: any;
  useLayoutEffect(() => {
    // smoother = ScrollSmoother.create({
    //   wrapper: "#scroll-wrapper",
    //   content: "#main-container",
    //   effects: true,
    //   // smooth: 1.2,
    // });
    gsap.to(window, { scrollTo: 0 });
  }, []);
  smoother;
  return (
    <div className="relative">
      <FluidCursor className={"pointer-events-none"} />
      <V3d />
      <Preloader />
      <div id="scroll-wrapper" className="z-[5]">
        <main id="main-container">
          {/* <Spline scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode" /> */}
          <img
            src="/graph.png"
            className="absolute top-0 left-0  w-[25vw]"
            alt=""
          />
          <motion.div
            animate={{
              x: ["-12.5vw", "0vw", "-12.5vw"],
              y: ["0vh", "50vh", "0vh"],
              transition: {
                x: {
                  duration: 17, // adjust duration as needed
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: 25, // adjust duration as needed
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
            className="w-[25vw] left-0 fixed h-[25vw] rounded-full opacity-25 bg-primary blur-[5vw] pointer-events-none"
          />
          <motion.div
            animate={{
              x: ["16vw", "0vw", "16vw"],
              y: ["0vh", "40vh", "0vh"],
              transition: {
                x: {
                  duration: 25, // adjust duration as needed
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                y: {
                  duration: 17, // adjust duration as needed
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
            className="w-[30vw] right-0 fixed h-[30vw] rounded-full opacity-25 bg-primary blur-[8vw] pointer-events-none"
          />
          <Navbar />
          <Hero id="hero" />
          <AboutUs id="about_us" />
          <NeedHelp id="need_help" />
          <OurServices id="our_services" />
          <RecentWork id="recent_work" />;
          <CompletedStories id="success_stories" />
          <OurBlog id="our_blog" />
          <Testimonial id="testimonials" />
          <ContactUs id="contact_us" />
        </main>
      </div>
    </div>
  );
}
