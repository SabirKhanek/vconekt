import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { ServiceType, services } from "../shared/constants/services";
import { AnimatedList } from "../components/animatedList";
import { Button } from "../components/button";
import { useRouteChange } from "../shared/hooks/useRouteChange";

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

      <div className="relative z-[2]">
        {services.map((service, index) => (
          <Service key={index} index={index} {...service}></Service>
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
}: ServiceType & { index: number }) {
  const navigate = useRouteChange();
  const isEven = (index + 1) % 2 === 0;
  return (
    <div className="relative h-screen">
      <div
        className={`responsive grid  ${
          isEven ? "grid-cols-[0.4fr_0.6fr]" : "grid-cols-[0.6fr_0.4fr]"
        } gap-10 absolute-centered`}
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
