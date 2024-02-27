import { HTMLProps, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceType, getServiceBySlug } from "../shared/constants/services";
import { Link } from "react-router-dom";
import { V3dContactUs } from "../components/3dLogoInContactUs";
import { Button } from "../components/button";
import { motion, useInView } from "framer-motion";
import { AboutUsVideo } from "../components/about_us_video";
import { RecentWork } from "../sections/recent_work";
import Testimonial from "../sections/testimonial";
import { ContactUs } from "../sections/contact_us";
export function IndividualServicePage({ ...props }: HTMLProps<HTMLDivElement>) {
  const slug = useParams()["slug"];
  const navigate = useNavigate();
  if (!slug) return;
  const service = getServiceBySlug(slug);
  if (!service) {
    navigate("/");
    return;
  }
  return (
    <div {...props} className="relative z-[2]">
      <HeroSection {...service} />
      <WhatIsSection {...service} />
      <WhatIsIncludedSection {...service} />
      <div className="my-20 relative z-10">
        <AboutUsVideo />
      </div>
      <RecentWork />
      <Testimonial />
      <ContactUs />
    </div>
  );
}

function HeroSection({ title, Illustration, slug }: ServiceType) {
  return (
    <div className="hero flex items-center justify-between relative responsive gap-4 pt-40 pb-24">
      <div className="flex-1 grow flex relative z-10 justify-center  flex-col gap-4">
        <h2 className="heading">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-primary">{title.split(" ").slice(-1)[0]}</span>
        </h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            to={"/"}
            className="hover:underline cursor-pointer text-primary"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link
            to={"/services"}
            className="hover:underline text-primary cursor-pointer"
          >
            Services
          </Link>
          <span className="text-primary">/</span>
          <Link
            to={`/services/${slug}`}
            className="hover:underline  cursor-pointer"
          >
            {title}
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <Illustration
          className="max-w-lg !w-full !h-auto pointer-events-none"
          alt=""
        />
      </div>
    </div>
  );
}

function WhatIsSection({ what_is_content }: ServiceType) {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.section
      ref={ref}
      animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
      className="grid grid-cols-[1.4fr_2fr] responsive gap-5"
    >
      <div className="relative">
        <V3dContactUs />
      </div>

      <div className="relative z-[2] responsive">
        <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
          What is {what_is_content.tag}
        </span>
        <h2 className="heading py-3">
          {what_is_content.heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-primary">
            {what_is_content.heading.split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className=" font-light py-3">{what_is_content.body}</p>
        <Button
          onClick={() => {
            navigate("/contact_us");
          }}
        >
          <span className="text-sm">Let's Connect</span>
        </Button>
      </div>
    </motion.section>
  );
}

function WhatIsIncludedSection({ what_is_included, title }: ServiceType) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.section
      ref={ref}
      animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
      className="my-10 responsive"
    >
      <span className="rounded-3xl bg-primary/15 text-primary px-5 py-2 uppercase font-orbit ">
        What is included?
      </span>
      <h2 className="heading my-3">
        Benefits of {title.split(" ").slice(0, -1).join(" ")}{" "}
        <span className="text-primary">{title.split(" ").slice(-1)[0]}</span>
      </h2>
      <div className="grid-cols-3 my-10 grid gap-10">
        {what_is_included.map((v, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8, y: -20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.3, delay: 0.3 * i },
              }}
              key={i}
              className="flex gap-3 items-start"
            >
              <span className="text-primary font-orbit font-semibold">
                0{i + 1}
              </span>
              <div>
                <h1 className="font-orbit  font-semibold">{v.heading}</h1>
                <p className="text-sm font-light">{v.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
