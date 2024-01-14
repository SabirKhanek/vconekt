import { Navbar } from "./components/nav";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Hero } from "./sections/hero.js";
gsap.registerPlugin(ScrollTrigger);
import "./App.css";
import { AboutUs } from "./sections/about_us.js";
import { V3d } from "./components/3dLogo.js";
import { FluidCursor } from "./components/fluidCursor.jsx";
import { Preloader } from "./components/preloader.js";

export default function App() {
  let smoother: any;
  useLayoutEffect(() => {
    // smoother = ScrollSmoother.create({
    //   wrapper: "#scroll-wrapper",
    //   content: "#main-container",
    //   effects: true,
    //   // smooth: 1.2,
    // });
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
          <Navbar />

          <Hero id="hero" />
          <AboutUs id="about_us" />
          <section className="relative h-[100vh] flex justify-center items-center">
            <div className="flex justify-center w-full gap-2">
              <div data-speed={0.5} className="box"></div>
              <div data-speed={1} className="box"></div>
              <div data-speed={1.5} className="box"></div>
            </div>
          </section>
          <section className="relative h-[100vh] flex justify-center items-center">
            <div className="flex justify-center w-full gap-2">
              <div data-speed={0.5} className="box"></div>
              <div data-speed={1} className="box"></div>
              <div data-speed={1.5} className="box"></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
