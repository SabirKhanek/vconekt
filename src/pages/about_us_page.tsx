import { Link } from "react-router-dom";
import { AboutUs } from "../sections/about_us";
import { CompletedStories } from "../sections/completed_stories";
import { ContactUs } from "../sections/contact_us";
import { OurServices } from "../sections/our_service";
import Testimonial from "../sections/testimonial";
import { OurWorkProcess } from "../sections/our_work_process";
import { AboutUsVideo } from "../components/about_us_video";

export default function AboutUsPage() {
  return (
    <>
      <div className="flex justify-center items-center flex-col z-[2] text-white relative  gap-4 pt-40 pb-24">
        <h2 className="heading uppercase ">About US</h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            to={"/"}
            className="hover:underline cursor-pointer text-primary"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link to={"/about_us"} className="hover:underline cursor-pointer">
            About Us
          </Link>
        </div>
      </div>
      <AboutUs id="about_us" />
      <OurServices id="our_services" />
      <OurWorkProcess />
      <CompletedStories id="completed_stories" />
      <div className="my-14 relative z-10">
        <AboutUsVideo />
      </div>
      <Testimonial id="testimonial" />
      <ContactUs id="contact_us" />
    </>
  );
}
