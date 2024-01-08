import Spline from "@splinetool/react-spline";
import { Navbar } from "./components/nav";
import { getResponsiveClasses } from "./shared/constants/getResponsiveClasses";
import { Button } from "./components/button";
import { useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { FluidCursor } from "./components/fluidCursor.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };

  useGSAP(() => {
    if (!is3dModelLoaded) return;
    const logo = spline.current?.findObjectById(
      "4105c047-d140-4582-9486-75af7f9aa712"
    );
    if (logo) {
      const logo = spline.current?.findObjectById(
        "4105c047-d140-4582-9486-75af7f9aa712"
      );
      if (logo) {
        const tl = gsap.timeline({});
        tl.set(logo.scale, { x: 3, y: 3, z: 3 });
        tl.to(logo.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
        });
        tl.to(logo.scale, {
          scrollTrigger: {
            markers: false,
            trigger: "#section1",
            start: "top 0px",
            end: "bottom 100%",
            endTrigger: "#section2",
            scrub: true,
          },
          x: 15,
          y: 15,
          z: 15,
          duration: 5,
        });
      }
    }
  }, [is3dModelLoaded]);

  return (
    <div
      onMouseMoveCapture={(e) => {
        // console.log(e.clientX, e.clientY);
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const screenWidth = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        );
        const screenHeight = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );
        const sensivity = 0.1;
        const relativeX = mouseX / screenWidth;
        const relativeY = mouseY / screenHeight;
        const yRotation = (relativeX - 0.5) * Math.PI * 2 * sensivity;
        const xRotation = (relativeY - 0.5) * Math.PI * 2 * sensivity;

        const logo = spline.current?.findObjectById(
          "4105c047-d140-4582-9486-75af7f9aa712"
        );

        if (logo) {
          logo.rotation.y = yRotation;
          logo.rotation.x = xRotation;
        }
      }}
    >
      {/* <Spline scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode" /> */}
      <FluidCursor className={"pointer-events-none"} />

      <Navbar />
      <div className="min-h-screen fixed pointer-events-none w-full top-0 left-0">
        <Spline
          id="spline"
          onLoad={onLoad}
          className="absolute-centered -z-0 flex justify-center items-center"
          scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode"
          onScroll={() => {
            console.log("scrolled");
          }}
        />
      </div>

      <section
        id="section1"
        className={`relative w-full min-h-screen z-10 flex justify-start items-center  ${getResponsiveClasses()}`}
      >
        <div className="max-w-96">
          <h2 className="text-5xl text-white ">
            Empowering the Future: Cutting-Edge Software Solutions
          </h2>
          <p className="text-primary my-5 font-medium pl-2 border-l-4 border-primary">
            Bring Force of Artificial Intelligence To Your
            <br />
            Business Development
          </p>
          <div className="flex items-center justify-between pointer-events-auto">
            <Button>
              <span className="font-orbit">Discover More</span>
            </Button>
            <Button bg="grey">
              <span className="font-orbit">Contact Us</span>
            </Button>
          </div>
        </div>
      </section>
      <section
        id="section2"
        className={`relative w-full min-h-screen z-10 flex justify-start items-center  ${getResponsiveClasses()}`}
      >
        <div className="max-w-96">
          <h2 className="text-5xl text-white ">
            Empowering the Future: Cutting-Edge Software Solutions
          </h2>
          <p className="text-primary my-5 font-medium pl-2 border-l-4 border-primary">
            Bring Force of Artificial Intelligence To Your
            <br />
            Business Development
          </p>
          <div className="flex items-center justify-between pointer-events-auto">
            <Button>
              <span className="font-orbit">Discover More</span>
            </Button>
            <Button bg="grey">
              <span className="font-orbit">Contact Us</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
