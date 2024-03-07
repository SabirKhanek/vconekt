import { HTMLProps, useRef } from "react";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "../components/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { motion, useInView } from "framer-motion";
import { Bot3D } from "../components/bot";
export function NeedHelp({ ...props }: HTMLProps<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
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
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".how_can_we_text_letter",
      { display: "none" },
      {
        display: "inline-block",
        duration: 0.01,
        stagger: 0.04,
      }
    );
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
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
                <span className="break-none">How may we serve</span>
                {"  "}
                <span className="text-primary">you</span> best?
              </h2>
              <span className="ml-2 inline-block w-0.5 h-9 bg-primary type_cursor how_can_we_text_letter"></span>
            </div>
            <p className="font-light text-white max-w-96">
              Dedicated experts crafting top-tier solutions, enhancing your
              experience with excellence.
            </p>
          </div>
          <div className="basis-96 shrink-0">
            <p className="font-light">
              Step into the realm of VconektLLC, where our expert team crafts
              personalized IT solutions to match your business needs. Embracing
              the ever-evolving landscape of innovation, we curate
              forward-thinking strategies that redefine industry standards.
              We're here to support you every step of the way, ensuring your
              experience with us is smooth and successful.
            </p>
          </div>
        </div>
        <div className="relative rounded-3xl px-6 py-9 flex justify-between items-center border-white/65 border-2 pointer-events-none">
          <div className="h-[244px] w-full -top-[244px] absolute left-1/2 -translate-x-1/2 overflow-hidden">
            <Bot3D scale={1.5} />
          </div>
          <p className="font-orbit small-heading font-semibold uppercase text-4xl basis-3/4 shrink-0">
            We stand ready to assist you in one click.
          </p>
          <Button bg="gradient">Contact Us</Button>
        </div>
      </div>
    </motion.section>
  );
}
