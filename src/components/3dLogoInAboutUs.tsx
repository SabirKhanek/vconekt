import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import { HTMLProps, useEffect, useRef, useState } from "react";
// import { RESOURCE_STATUS, usePreloader } from "../shared/contexts/preloader";

export interface V3dAboutUSProps extends HTMLProps<HTMLDivElement> {
  scale?: number;
  parentRef?: React.RefObject<HTMLDivElement>;
}

export function V3dAboutUS({ scale, parentRef, ...props }: V3dAboutUSProps) {
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };
  // const preloader = usePreloader();

  useEffect(() => {
    // preloader.registerResource("dummyResource");
    // setTimeout(() => {
    //   preloader.updateStatus("dummyResource", RESOURCE_STATUS.LOADED);
    // }, 6000);
    const onMouseMove = (e: MouseEvent) => {
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

  useEffect(() => {
    if (!is3dModelLoaded) return;
    const logo = spline.current?.findObjectById(
      "4105c047-d140-4582-9486-75af7f9aa712"
    );

    if (logo) {
      logo.scale.x = scale || 1;
      logo.scale.y = scale || 1;
      logo.scale.z = scale || 1;
      //   logo.position.x -= 35;
      if (parentRef?.current) {
        logo.position.y -= parentRef.current.clientHeight / 4;
        logo.position.x -= parentRef.current.clientWidth / 4;
      }
    }
  }, [is3dModelLoaded]);

  return (
    <div
      ref={elementRef}
      className={`absolute left-0 top-0 w-full h-full pointer-events-none ${
        is3dModelLoaded ? "" : "hidden"
      }`}
      {...props}
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
