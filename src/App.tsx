import Spline from "@splinetool/react-spline";
import { Navbar } from "./components/nav";
import { getResponsiveClasses } from "./shared/constants/getResponsiveClasses";
import { Button } from "./components/button";

export default function App() {
  return (
    <>
      {/* <Spline scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode" /> */}
      <Navbar />
      <div className="absolute top-0 left-0 w-full min-h-[100vh] flex justify-center items-center">
        <Spline
          className="min-h-screen "
          scene="https://prod.spline.design/CKWF1KdvY5LNUrVL/scene.splinecode"
        />
      </div>
      <div
        className={`absolute top-0 left-0 right-0 w-full min-h-screen flex justify-start items-center pointer-events-none ${getResponsiveClasses()}`}
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
          <div className="flex items-center justify-between">
            <Button>
              <span className="font-orbit">Discover More</span>
            </Button>
            <Button bg="grey">
              <span className="font-orbit">Contact Us</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
