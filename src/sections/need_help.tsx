import { HTMLProps } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "../components/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { motion } from "framer-motion";
export function NeedHelp({ ...props }: HTMLProps<HTMLElement>) {
  useGSAP(() => {
    new SplitType("#how_can_we_text", {
      types: ["chars", "words"],
      charClass: "how_can_we_text_letter",
      wordClass: "break-none",
    });
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#need_help",
        start: "25% center",
        end: "25% top",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to("#robot_avatar", {
      top: 0,
      duration: 1,
      ease: "bounce.out",
    });
    tl.fromTo(
      ".how_can_we_text_letter",
      { display: "none" },
      {
        display: "inline-block",
        duration: 0.01,
        stagger: 0.04,
      }
    );
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...(props as any)}
      className={` text-white relative h-screen w-full z-[2]  bg-transparent justify-start ${getResponsiveClasses()}`}
    >
      <div className="flex flex-col justify-between h-full py-[10vh]">
        <div className="flex justify-between gap-2 w-full">
          <div className="basis-1/2 items-center shrink-0">
            <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
              Need Help?
            </span>
            <div className="my-3 w-[80%]">
              <h2
                id="how_can_we_text"
                className=" font-orbit inline font-semibold text-4xl md:text-5xl "
              >
                <span className="break-none">How can we help</span>
                {"  "}
                <span className="text-primary">You?</span>
              </h2>
              <span className="ml-2 inline-block w-0.5 h-9 bg-primary type_cursor"></span>
            </div>
            <p className="font-light text-white max-w-96">
              We have a team of highly skilled and experienced professionals who
              are dedicated to providing high-quality services to our clients.
            </p>
          </div>
          <div className="basis-96 shrink-0">
            <p className="font-light">
              We offer expert IT services because we have a team of highly
              skilled and experienced professionals who are dedicated to
              providing the best possible solutions to meet our clients’ needs.
              Our team stays up-to-date with the latest technologies and trends
              in the industry, allowing us to provide cutting-edge solutions
              that help our clients achieve their business goals. Additionally,
              we pride ourselves on our ability to provide exceptional customer
              service and support, ensuring that our clients are satisfied with
              our work every step of the way.
            </p>
          </div>
        </div>
        <div className="relative rounded-3xl px-6 py-9 flex justify-between items-center border-white/65 border-2 pointer-events-none">
          <div className="h-[50vh] w-full -top-[51vh] absolute left-1/2 -translate-x-1/2 overflow-hidden">
            <img
              src="/robot.png"
              className="absolute h-full top-[50vh] w-auto  left-1/2 -translate-x-1/2"
              id="robot_avatar"
              alt=""
            />
          </div>
          <p className="font-orbit font-semibold text-4xl basis-3/4 shrink-0">
            WHEN YOU NEED HELP, WE'RE JUST A CLICK AWAY.
          </p>
          <Button bg="gradient">Contact Us</Button>
        </div>
      </div>
    </motion.section>
  );
}
