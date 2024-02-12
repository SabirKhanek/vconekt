import { AboutUs } from "../sections/about_us";
import { CompletedStories } from "../sections/completed_stories";
import { ContactUs } from "../sections/contact_us";
import { OurServices } from "../sections/our_service";
import Testimonial from "../sections/testimonial";

export function AboutUsPage() {
  return (
    <>
      <AboutUs id="about_us" />
      <OurServices id="our_services" />
      <CompletedStories id="completed_stories" />
      <Testimonial id="testimonial" />
      <ContactUs id="contact_us" />
    </>
  );
}
