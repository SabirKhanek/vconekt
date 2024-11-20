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
import { useEffect } from 'react';
import Script from 'next/script';

export default function ContactUsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isLoading, setIsLoading] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');

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
      setThankYouMessage('Thank You!');
      event.target.reset();
      setTimeout(() => {
        setThankYouMessage('');
      }, 5000); // Message disappears after 5 seconds
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
              content="Ready to unlock your business potential? Contact VConekt today! We're passionate about crafting 
              custom IT solutions to fuel your success. Get in touch!"
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
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="heading mb-6">GET IN TOUCH WITH US</h2>
          <div
            className="w-full px-5 py-8 md:px-10"
            style={{
              background:
                'linear-gradient(45.84deg, #131A14 1.97%, #253426 97.02%)',
              borderRadius: '12px'
            }}
          >
            <div className="relative min-h-[700px] w-full">
              <iframe
                src="https://link.apisystem.tech/widget/form/Tc8lIuQPRf7anHOVLHW4"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '3px',
                  background: 'transparent',
                  backgroundColor: 'transparent'
                }}
                id="inline-Tc8lIuQPRf7anHOVLHW4"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="VConekt Website"
                data-height="700"
                data-layout-iframe-id="inline-Tc8lIuQPRf7anHOVLHW4"
                data-form-id="Tc8lIuQPRf7anHOVLHW4"
                title="VConekt Website"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
      <Script src="https://link.msgsndr.com/js/form_embed.js" />
    </>
  );
}
