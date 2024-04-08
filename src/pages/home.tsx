import { AboutUs } from "../sections/about_us";
import { CompletedStories } from "../sections/completed_stories";
import { ContactUs } from "../sections/contact_us";
import { Hero } from "../sections/hero";
import { NeedHelp } from "../sections/need_help";
import { OurBlog } from "../sections/our_blog";
import { OurServices } from "../sections/our_service";
import { RecentWork } from "../sections/recent_work";
import Testimonial from "../sections/testimonial";

export default function Home() {
  return (
    <>
      <Hero id="hero" />
      <AboutUs doAnimate id="about_us" />
      <NeedHelp id="need_help" />
      <OurServices id="our_services" />
      <RecentWork id="recent_work" />;
      <CompletedStories id="success_stories" />
      <OurBlog id="our_blog" />
      <Testimonial id="testimonials" />
      <ContactUs id="contact_us" />
    </>
  );
}
