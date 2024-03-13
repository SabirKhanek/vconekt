import { useEffect, useState } from "react";
import { usePreloader } from "../shared/contexts/preloader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Preloader({ ...props }) {
  const [progress, setProgress] = useState(0);
  const preloader = usePreloader();

  useEffect(() => {
    setProgress(
      (preloader.resources.length - preloader.loadingCount) /
        preloader.resources.length
    );
  }, [preloader.loadingCount, preloader.resources]);

  useEffect(() => {
    if (!preloader.isLoaded) {
      document.getElementsByTagName("body")[0].classList.add("no-scrollbar");
    } else {
      document.getElementsByTagName("body")[0].classList.remove("no-scrollbar");
    }
  }, [preloader.isLoaded]);

  useGSAP(() => {
    // console.log(progress);
    gsap.to("#progress_line", {
      width: `${progress * 100}%`,
    });
  }, [progress]);
  return !preloader.isLoaded ? (
    <div {...props} className={`h-screen w-screen fixed bg-black z-[15]`}>
      <div
        className="h-1 w-0  bg-primary relative z-50"
        id="progress_line"
      ></div>
    </div>
  ) : null;
}
