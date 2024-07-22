import { AboutUs } from '@/components/site/sections/about_us';
import { CompletedStories } from '@/components/site/sections/completed_stories';
import { ContactUs } from '@/components/site/sections/contact_us';
import { OurServices } from '@/components/site/sections/our_service';
import Testimonial from '@/components/site/sections/testimonial';
import { OurWorkProcess } from '@/components/site/sections/our_work_process';
import { AboutUsVideo } from '@/components/site/about_us_video';
import Link from 'next/link';
import Head from 'next/head';

export default function AboutUsPage() {
  return (
    <>
      <div className="relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-40 text-white">
        <Head>
          <meta
            name="title"
            content="Learn About Us and Our Expertise | VConekt LLC"
          />
          <meta
            name="description"
            content="VConekt crafts strategic web & app design, development, SEO, and digital transformation to propel your business. Learn why we're different."
          />
        </Head>
        <h2 className="heading uppercase ">About US</h2>
        <div className="flex items-center gap-3 font-orbit font-medium ">
          <Link
            href={'/'}
            className="cursor-pointer text-primary hover:underline"
          >
            Home
          </Link>
          <span className="text-primary">/</span>
          <Link href={'/about_us'} className="cursor-pointer hover:underline">
            About Us
          </Link>
        </div>
      </div>
      <AboutUs id="about_us" />
      <OurServices id="our_services" />
      <OurWorkProcess />
      <CompletedStories id="completed_stories" />
      <div className="relative z-10 my-14">
        <AboutUsVideo />
      </div>
      <Testimonial id="testimonial" />
      <ContactUs id="contact_us" />
    </>
  );
}
