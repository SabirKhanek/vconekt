import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { Button } from "../components/button";
import { useGSAP } from "@gsap/react";
import { usePreloader } from "../shared/contexts/preloader";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export function ContactUsPage() {
  const preloader = usePreloader();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "1db36cb6-0124-4a37-b335-b5d65c259e04");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      event.target.reset();
    } else {
      console.log("Error", data);
    }
    setIsLoading(false);
  };
  useGSAP(() => {
    if (!isInView) return;
    const tl = gsap.timeline({});
    tl.fromTo(
      "#lets_text",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0 }
    ).fromTo("#talk_text", { opacity: 0, x: 30 }, { opacity: 1, x: 0 });
  }, [preloader.isLoaded, isInView]);
  return (
    <>
      <div className="flex justify-center items-center flex-col z-[2] text-white relative  gap-4 pt-36 pb-24">
        <div className="relative flex justify-center flex-col items-center h-64">
          <V3dContactUs scale={0.7} />

          <div
            ref={ref}
            className="flex relative z-10 justify-center items-center flex-col font-semibold gap-4"
          >
            <div className=" relative leading-none xl-heading font-orbit uppercase">
              <div className="opacity-0">
                LETS TALK
                <br />
                TALK
              </div>
              <div className="flex flex-col absolute top-0 left-0 w-full h-full">
                <h2 className=" self-start" id="lets_text">
                  LETS
                </h2>
                <h2 className=" self-end" id="talk_text">
                  TALK
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-3 font-orbit  font-medium ">
              <Link
                to={"/"}
                className="hover:underline cursor-pointer text-primary"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link
                to={"/contact_us"}
                className="hover:underline cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[2] responsive">
        <h2 className="heading">
          Let's embark on this journey together.{" "}
          <span className="text-primary"> Reach out now,</span> and let the
          magic unfold.
        </h2>
        <div
          className="w-full my-3 px-10 md:px-20 py-10"
          style={{
            background:
              "linear-gradient(45.84deg, #131A14 1.97%, #253426 97.02%)",
          }}
        >
          <form onSubmit={onSubmit}>
            <div className="flex flex-wrap items-center gap-4 font-orbit">
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your name?</label>
                <input
                  placeholder="your name?"
                  type="text"
                  name="name"
                  style={{ background: "rgba(19, 26, 20, 1)" }}
                  className="p-2 bg-black text-white outline-none"
                />
              </div>
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your email?</label>
                <input
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  style={{ background: "rgba(19, 26, 20, 1)" }}
                  className="p-2 bg-black text-white outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap my-3 items-center gap-4 font-orbit">
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your phone number?</label>
                <input
                  placeholder="phone number"
                  type="text"
                  name="phone"
                  style={{ background: "rgba(19, 26, 20, 1)" }}
                  className="p-2 bg-black text-white outline-none"
                />
              </div>
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">Your Country?</label>
                <input
                  type="text"
                  placeholder="country"
                  name="country"
                  style={{ background: "rgba(19, 26, 20, 1)" }}
                  className="p-2 bg-black text-white outline-none"
                />
              </div>
            </div>
            <div className="flex  flex-1 flex-col gap-1">
              <label htmlFor="">Your project is about?</label>
              <textarea
                name="project_details"
                id=""
                rows={7}
                className="resize-none p-2 bg-black text-white outline-none"
                style={{ background: "rgba(19, 26, 20, 1)" }}
              />
            </div>
            <div className="flex flex-wrap items-center mt-3 gap-3">
              <Button type="submit">Submit</Button>
              {isLoading && <FaSpinner className="animate-spin"></FaSpinner>}
              <p className="text-sm">
                OR YOU CAN EMAIL US HERE:{" "}
                <a
                  href="mailto:info@vconekt.com"
                  className="hover:underline cursor-pointer"
                >
                  info@vconekt.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="relative z-[2] responsive">
        <img
          src="/map.png"
          className="w-full hover:grayscale-0 transition-all duration-200 ease-in-out cursor-pointer my-9 grayscale"
          alt=""
        />
      </div>
    </>
  );
}
