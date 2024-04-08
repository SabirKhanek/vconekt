import { Navbar } from "./components/nav";
import { useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);
import "./App.css";

import { lazy } from 'react';

const V3d = lazy(() => import("./components/3dLogo.js"));
const FluidCursor = lazy(() => import("./components/fluidCursor.tsx"));
import { Preloader } from "./components/preloader.js";

import { motion } from "framer-motion";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-particles";
import { Footer } from "./sections/footer.js";
import { useRoutes } from "react-router-dom";
import { routesConfig } from "./app.routes.js";
export default function App() {
  const routes = useRoutes(routesConfig);
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
    // console.log(container);
    container;
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
        <main id="main-container" className="overflow-x-hidden text-white">
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
          {routes}
          <Footer />
        </main>
      </div>
    </div>
  );
}
