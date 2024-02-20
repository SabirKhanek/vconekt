import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { HTMLProps, useEffect, useRef, useState } from "react";

export interface Bot3DProps extends HTMLProps<HTMLDivElement> {
  scale?: number;
}

export function Bot3D({ scale, ...props }: Bot3DProps) {
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const spline = useRef<Application>();
  const onLoad = (splineApp: Application) => {
    spline.current = splineApp;
    if (!is3dModelLoaded) setIs3dModelLoaded(true);
  };
  const [direction, setDirection] = useState<"left" | "right">("right");
  useGSAP(() => {
    if (!is3dModelLoaded) return;
    const bot = spline.current?.findObjectById(
      "424e2cb5-1cda-412c-8291-203803687215"
    );
    if (!bot) return;
    console.log(bot);
    const rotationAmount = direction !== "left" ? -0.36 : -2.45;
    console.log("rotationAmount", rotationAmount);
    gsap.to(bot.rotation, { y: rotationAmount, duration: 1 });
  }, [direction]);

  const onMouseMove = (e: MouseEvent) => {
    const screenWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const mouseX = e.clientX;
    // console.log({
    //   screenWidth,
    //   mouseX,
    //   direction: mouseX < screenWidth / 2 ? "left" : "right",
    // });
    if (mouseX < screenWidth / 2) {
      setDirection("left");
    } else if (mouseX > screenWidth / 2) {
      setDirection("right");
    }
  };

  useEffect(() => {
    console.log(direction);
  }, [direction]);

  useEffect(() => {
    const cvs = spline.current;
    if (!cvs) return;
    const bot = cvs.findObjectById("424e2cb5-1cda-412c-8291-203803687215");

    if (bot) {
      const scaleAmnt = 2;
      bot.scale.x = scaleAmnt;
      bot.scale.y = scaleAmnt;
      bot.scale.z = scaleAmnt;
    }

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
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
        scene="https://prod.spline.design/3j7cox8YTtMGwSkT/scene.splinecode"
      />
    </div>
  );
}
