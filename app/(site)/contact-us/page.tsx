'use client';
import { V3dContactUs } from '@/components/site/3dLogoInContactUs';
import { Button } from '@/components/site/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

export default function ContactUsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData(event.target);

    formData.append('access_key', '3e1b1aa6-bc61-44a9-b596-25f58b98cd5d');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      event.target.reset();
    } else {
      console.log('Error', data);
    }
    setIsLoading(false);
  };
  useGSAP(() => {
    if (!isInView) return;
    const tl = gsap.timeline({});
    tl.fromTo(
      '#lets_text',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0 }
    ).fromTo('#talk_text', { opacity: 0, x: 30 }, { opacity: 1, x: 0 });
  }, [isInView]);
  return (
    <>
      <div className="relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-36 text-white">
        <div className="relative flex h-64 flex-col items-center justify-center">
          <V3dContactUs scale={0.7} />
          <Head>
            <meta
              name="title"
              content="VConekt Contact Us | Let's Talk About Your Business Growth"
            />
            <meta
              name="description"
              content="Ready to unlock your business potential? Contact VConekt today! We're passionate about crafting custom IT solutions to fuel your success. Get in touch!"
            />
          </Head>
          <div
            ref={ref}
            className="relative z-10 flex flex-col items-center justify-center gap-4 font-semibold"
          >
            <div className=" xl-heading relative font-orbit uppercase leading-none">
              <div className="opacity-0">
                LETS TALK
                <br />
                TALK
              </div>
              <div className="absolute left-0 top-0 flex h-full w-full flex-col">
                <h2 className=" self-start" id="lets_text">
                  LETS
                </h2>
                <h2 className=" self-end" id="talk_text">
                  TALK
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-3 font-orbit  font-medium ">
              <Link
                href={'/'}
                className="cursor-pointer text-primary hover:underline"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link
                href={'/contact-us'}
                className="cursor-pointer hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive relative z-[2]">
        <h2 className="heading">
          Let's embark on this journey together.{' '}
          <span className="text-primary"> Reach out now,</span> and let the
          magic unfold.
        </h2>
        <div
          className="my-3 w-full px-10 py-10 md:px-20"
          style={{
            background:
              'linear-gradient(45.84deg, #131A14 1.97%, #253426 97.02%)'
          }}
        >
          <form onSubmit={onSubmit}>
            <div className="flex flex-wrap items-center gap-4 font-orbit">
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your name?</label>
                <input
                  placeholder="your name?"
                  type="text"
                  name="name"
                  style={{ background: 'rgba(19, 26, 20, 1)' }}
                  className="bg-black p-2 text-white outline-none"
                />
              </div>
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your email?</label>
                <input
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  style={{ background: 'rgba(19, 26, 20, 1)' }}
                  className="bg-black p-2 text-white outline-none"
                />
              </div>
            </div>
            <div className="my-3 flex flex-wrap items-center gap-4 font-orbit">
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">What's your phone number?</label>
                <input
                  placeholder="phone number"
                  type="text"
                  name="phone"
                  style={{ background: 'rgba(19, 26, 20, 1)' }}
                  className="bg-black p-2 text-white outline-none"
                />
              </div>
              <div className="flex min-w-[250px] flex-1 flex-col gap-1">
                <label htmlFor="">Your Country?</label>
                <input
                  type="text"
                  placeholder="country"
                  name="country"
                  style={{ background: 'rgba(19, 26, 20, 1)' }}
                  className="bg-black p-2 text-white outline-none"
                />
              </div>
            </div>
            <div className="flex  flex-1 flex-col gap-1">
              <label htmlFor="">Your project is about?</label>
              <textarea
                name="project_details"
                id=""
                rows={7}
                className="resize-none bg-black p-2 text-white outline-none"
                style={{ background: 'rgba(19, 26, 20, 1)' }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button type="submit">Submit</Button>
              {isLoading && <FaSpinner className="animate-spin"></FaSpinner>}
              <p className="text-sm">
                OR YOU CAN EMAIL US HERE:{' '}
                <a
                  href="mailto:contact@vconekt.com"
                  className="cursor-pointer hover:underline"
                >
                  contact@vconekt.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="responsive relative z-[2]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.9391694766897!2d-82.64400792396726!3d27.90416997619675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e21b8b333333%3A0x7c7f4a5f8e4b4b4b!2s7901%204th%20St%20N%2C%20St.%20Petersburg%2C%20FL%2033702!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
