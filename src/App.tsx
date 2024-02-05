import { Navbar } from "./components/nav";
import { useCallback, useLayoutEffect } from "react";
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
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";
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

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log(container);
  }, []);
  return (
    <div className="relative">
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        className="z-[1] relative"
        url="/particles_config.json"
      />
      <FluidCursor className={"pointer-events-none"} />
      <V3d />
      <Preloader />
      <div id="scroll-wrapper" className="z-[5]">
        <main id="main-container">
          {/* <Spline scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode" /> */}
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
              x: ["20vw", "10vw", "20vw"],
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
