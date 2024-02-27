import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { ServiceType, services } from "../shared/constants/services";
import { AnimatedList } from "../components/animatedList";
import { Button } from "../components/button";
import { useRouteChange } from "../shared/hooks/useRouteChange";
import { useRef } from "react";
import { ReactRef, useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ServicesPage() {
  return (
    <>
      <div className="flex justify-center items-center flex-col z-[2] text-white relative  gap-4 pt-40 pb-24">
        <h2 className="heading uppercase ">Services</h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            to={"/"}
            className="hover:underline cursor-pointer text-primary"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link to={"/about_us"} className="hover:underline cursor-pointer">
            Services
          </Link>
        </div>
        <div className="relative py-9 z-[2] responsive">
          <div className="relative z-10">
            <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
              Our Services
            </span>
            <h2 className="heading max-w-3xl mt-3">
              We provide a variety of IT services through{" "}
              <span className="text-primary">Vconekt LLC</span>.
            </h2>
          </div>
          <V3dContactUs scale={1} />
        </div>
      </div>

      <Services />
    </>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const container = ref.current;
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `-${document.documentElement.clientHeight / 2} center`,
        endTrigger: container,
        end: `+${document.documentElement.clientHeight * 2} bottom`,
        snap: { snapTo: 1, duration: 1, ease: "linear" },
      },
    });
  }, []);
  return (
    <div
      ref={ref}
      style={{ height: `${services.length * 180 + 20}vh` }}
      className="relative z-[2] overflow-hidden"
    >
      {services.map((service, index) => (
        <Service
          parentRef={ref}
          isLast={index === services.length - 1}
          key={index}
          index={index}
          {...service}
        ></Service>
      ))}
    </div>
  );
}

function Service({
  title,
  description,
  highlights,
  slug,
  Illustration,
  index,
  isLast = false,
  parentRef,
}: ServiceType & { index: number; isLast?: boolean; parentRef: ReactRef }) {
  const navigate = useRouteChange();
  const isEven = (index + 1) % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const animation = () => {
    const container = ref.current;
    if (!container) return;
    const content = container.children[0];

    const ftl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        pinnedContainer: content,
        pin: true,
        endTrigger: isLast ? parentRef.current : container,
        end: isLast ? "bottom bottom" : "center top",
        pinSpacing: false,
        snap: { snapTo: 1, duration: 1, ease: "linear" },
        scrub: true,
      },
    });

    if (isLast) {
      ftl.fromTo(
        content,
        {
          x: document.documentElement.clientWidth + 550,
          y: -content.clientHeight - 1,
          transform: "perspective(500px) rotateY(5deg)",
          z: -500,
        },
        {
          x: 0,
          y: (document.documentElement.clientHeight - content.clientHeight) / 2,
          transform: "perspective(500px) rotateY(0)",
          z: 0,
        }
      );
      return;
    }

    const stl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "+1vh top",
        pinnedContainer: content,
        pin: true,
        pinSpacing: false,
        snap: { snapTo: 0.9, duration: 1, ease: "linear" },
        endTrigger: container,
        end: "bottom top",
        scrub: true,
      },
    });

    ftl.fromTo(
      content,
      {
        y: -content.clientHeight - 370,
        top: 0,
        z: -1000,
        transform: "perspective(1000px)",
        rotatey: "-15deg",
      },
      {
        y: (document.documentElement.clientHeight - content.clientHeight) / 2,
        top: "50vh",
        z: 0,
        transform: "perspective(1000px)",
        rotateY: "0",
      }
    );

    stl.to(content, {
      y: document.documentElement.clientHeight,
      transform: "perspective(1000px)",
      rotateY: "10deg",
      opacity: 0,
      z: 400,
      x: index % 2 === 0 ? 100 : -100,
    });
  };

  useGSAP(animation, { scope: ref, dependencies: [ref] });
  return (
    <div
      ref={ref}
      className={`h-[200vh] w-full overflow-hidden absolute pointer-events-none`}
      style={{
        top: `${index * 180}vh`,
        height: "200vh",
        zIndex: index,
      }}
    >
      <div
        className={`responsive grid  ${
          isEven ? "grid-cols-[0.4fr_0.6fr]" : "grid-cols-[0.6fr_0.4fr]"
        } gap-10 top-0 left-0 `}
      >
        <div className={`flex flex-col gap-5`}>
          <h2 className="heading">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">
              {title.split(" ").slice(-1)[0]}
            </span>
          </h2>
          <p className="font-light">{description}</p>
          <AnimatedList
            listIconSize={20}
            className="flex flex-col gap-2"
            itemClass="gap-2"
            items={highlights}
            textClass="text-base"
          />
          <Button
            onClick={() => navigate(`/services/${slug}`)}
            className="self-start pointer-events-auto"
          >
            <span className="text-sm px-2">Learn More</span>
          </Button>
        </div>
        <div
          className={`flex justify-end items-center ${
            isEven ? "-order-1" : ""
          }`}
        >
          <Illustration className="max-w-[450px] max-h-[450] w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
