'use client';
import { AboutUs } from '@/components/site/sections/about_us';
import { CompletedStories } from '@/components/site/sections/completed_stories';
import { ContactUs } from '@/components/site/sections/contact_us';
import { Hero } from '@/components/site/sections/hero';
import { NeedHelp } from '@/components/site/sections/need_help';
import { OurBlog } from '@/components/site/sections/our_blog';
import { OurServices } from '@/components/site/sections/our_service';
import { RecentWork } from '@/components/site/sections/recent_work';
import Testimonial from '@/components/site/sections/testimonial';

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