import { ReactRef, useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { RESOURCE_STATUS, usePreloader } from "../shared/contexts/preloader";
import { useLocation } from "react-router-dom";

export interface V3dProps {
  className?: string;
  nextElRef?: ReactRef;
}
export function V3d({ nextElRef }: V3dProps) {
  const location = useLocation();

  const elementRef = useRef<HTMLDivElement>(null);
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };
  const preloader = usePreloader();

  useEffect(() => {
    preloader.registerResource("hero3d");
    const onMouseMove = (e: MouseEvent) => {
      if (elementRef.current?.classList.contains("hidden")) return;
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
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useGSAP(() => {
    if (!is3dModelLoaded) return;
    if (!elementRef.current) return;
    let NextEle =
      nextElRef?.current ||
      document.getElementById(
        location.pathname === "/"
          ? "about_us"
          : location.pathname === "/services"
          ? "services"
          : ""
      );

    preloader.updateStatus("hero3d", RESOURCE_STATUS.LOADED);
    const logo = spline.current?.findObjectById(
      "4105c047-d140-4582-9486-75af7f9aa712"
    );
    if (logo) {
      if (logo) {
        const tl = gsap.timeline({});
        tl.set(logo.scale, { x: 1, y: 1, z: 1 });

        tl.to(logo.scale, {
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 0px",
            end: "center top",
            endTrigger: NextEle,
            scrub: true,
          },
          x: 25,
          y: 25,
          z: 25,
        });
      }
    }

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: elementRef.current,
          start: "bottom top",
          endTrigger: NextEle,
          end: "bottom top",
          onEnter: () => {
            console.log("entered");
            // Add the class 'z-0' when entering the viewport
            elementRef.current?.classList.add("z-10");
            // Remove the class 'z-10' if it was previously added
            elementRef.current?.classList.remove("z-[3]");
          },
          onLeave: () => {
            console.log("left");
            // Add the class 'z-10' when leaving the viewport
            elementRef.current?.classList.add("z-[3]");
            // Remove the class 'z-0' if it was previously added
            elementRef.current?.classList.remove("z-10");
            // elementRef.current?.classList.add("hidden");
          },
          onLeaveBack: () => {
            console.log("leave back");
            // Add the class 'z-10' when leaving the viewport
            elementRef.current?.classList.add("z-[3]");
            // Remove the class 'z-0' if it was previously added
            elementRef.current?.classList.remove("z-10");
          },
        },
      }
    );

    gsap.to(elementRef.current, {
      opacity: 0,
      scrollTrigger: {
        onLeave: () => {
          elementRef.current?.classList.add("hidden");
        },
        onLeaveBack: () => {
          elementRef.current?.classList.remove("hidden");
        },
        onEnterBack: () => {
          elementRef.current?.classList.remove("hidden");
        },
        trigger: NextEle,
        start: "top top",

        end: "center top",
        scrub: true,
      },
    });
  }, [is3dModelLoaded, elementRef.current, nextElRef, location.pathname]);
  return (
    <div
      ref={elementRef}
      className={`min-h-screen fixed pointer-events-none z-[3] w-full top-0 left-0 ${
        is3dModelLoaded ? "" : "hidden"
      } ${
        location.pathname !== "/" && location.pathname !== "/services"
          ? "!hidden"
          : ""
      }`}
    >
      <Spline
        id="spline"
        onLoad={onLoad}
        className="absolute-centered  flex justify-center items-center"
        scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode"
        onScroll={() => {
          console.log("scrolled");
        }}
      />
    </div>
  );
}
