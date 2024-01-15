import { Navbar } from "./components/nav";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import { Hero } from "./sections/hero.js";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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
          <NeedHelp id="need_help" />
          <OurServices id="our_services" />
          <RecentWork id="recent_work" />;
          <CompletedStories id="success_stories" />
          <ContactUs id="contact_us" />
        </main>
      </div>
    </div>
  );
}
