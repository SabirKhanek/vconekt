import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { ServiceType, services } from "../shared/constants/services";
import { AnimatedList } from "../components/animatedList";
import { Button } from "../components/button";
import { useRouteChange } from "../shared/hooks/useRouteChange";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
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
              We provide a variety of IT services through Vconekt LLC.
            </h2>
          </div>
          <V3dContactUs scale={1} />
        </div>
      </div>

      <div
        style={{ height: `${services.length * 100}vh` }}
        className="relative z-[2] mb-10"
      >
        {services.map((service, index) => (
          <Service
            isLast={index === services.length - 1}
            key={index}
            index={index}
            {...service}
          ></Service>
        ))}
      </div>
    </>
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
}: ServiceType & { index: number; isLast?: boolean }) {
  const navigate = useRouteChange();
  const isEven = (index + 1) % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const animation = () => {
    const container = ref.current;
    if (!container) return;
    const content = container.children[0];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        pinnedContainer: content,
        pin: true,
        endTrigger: isLast ? document.documentElement : container,
        end: isLast ? "bottom bottom" : "bottom top",
        pinSpacing: false,
        scrub: true,
      },
    });

    tl.fromTo(
      content,
      {
        x: document.documentElement.clientWidth + 550,
        y: -content.clientHeight - 1,
        transform: "perspective(500px) rotateY(5deg)",
        z: -500,
      },
      {
        x: isLast ? 0 : -content.clientWidth - 10,
        y: isLast ? 0 : document.documentElement.clientHeight,
        transform: isLast
          ? "perspective(500px) rotateY(0)"
          : "perspective(500px) rotateY(-10deg)",
        z: isLast ? 0 : 300,
      }
    );
  };

  useGSAP(animation, { scope: ref, dependencies: [ref] });
  return (
    <div
      ref={ref}
      className={`h-[200vh] w-full overflow-hidden absolute`}
      style={{
        top: `${index * 100}vh`,
        height: isLast ? "100vh" : "200vh",
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
            className="self-start"
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
