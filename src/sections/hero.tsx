import { HTMLProps } from "react";
import { Button } from "../components/button";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";

export function Hero({ ...props }: HTMLProps<HTMLElement>) {
  return (
    <section
      {...props}
      //   data-speed={0.5}
      className={`relative w-full h-[100vh] z-10 ${getResponsiveClasses()}`}
    >
      <div className="h-screen flex justify-between items-center">
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
        <span className="flex gap-1 items-center translate-x-1/2 -rotate-90">
          <svg
            className="rotate-90 inline"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.43301 13.25C8.24056 13.5833 7.75944 13.5833 7.56699 13.25L0.638783 1.25C0.446334 0.916667 0.686896 0.500001 1.0718 0.500001L14.9282 0.5C15.3131 0.5 15.5537 0.916667 15.3612 1.25L8.43301 13.25Z"
              fill="#B2E161"
            />
          </svg>
          <span className="text-primary font-orbit break-keep">
            Scroll&nbsp;Down
          </span>
        </span>
      </div>
    </section>
  );
}
