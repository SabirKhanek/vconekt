import { Navbar } from "./components/nav";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import { Hero } from "./sections/hero.js";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import "./App.css";
import { AboutUs } from "./sections/about_us.js";
import { V3d } from "./components/3dLogo.js";
import { FluidCursor } from "./components/fluidCursor.jsx";
export default function App() {
  let smoother = new ScrollSmoother({});
  useEffect(() => {
    smoother = new ScrollSmoother({
      wrapper: "#scroll-wrapper",
      content: "#main-container",
      // smooth: 1.5,
    });
  }, []);
  smoother;
  return (
    <div className="relative">
      <FluidCursor className={"pointer-events-none"} />
      <V3d />

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
        </main>
      </div>
    </div>
  );
}
