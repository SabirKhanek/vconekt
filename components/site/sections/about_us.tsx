'use client';
import React, { HTMLProps, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaStar } from 'react-icons/fa';
import { V3dAboutUS } from '@/components/site/3dLogoInAboutUs';
import { motion } from 'framer-motion';
import { AnimatedList } from '@/components/site/animatedList';
export const AboutUs = React.memo(
  ({
    doAnimate,
    ...props
  }: HTMLProps<HTMLElement> & { doAnimate?: boolean }) => {
    const vidContainerRef = useRef<HTMLDivElement>(null);
    const contenRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef(null);
    const sectionRef = useRef(null);
    // const [isInView, setIsInView] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const animateTarget = {
      transform: 'perspective(1000px) rotateY(0deg) translateZ(0)',
      opacity: 1,
      backgroundColor: '#00000000',
      borderRadius: 0
    };
    useGSAP(() => {
      if (!sectionRef.current) return;
      if (!contenRef.current) return;
      if (doAnimate) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            endTrigger: `#${props.id}` || '#about_us',

            end: 'bottom bottom',
            pin: true,
            scrub: true,
            onLeave: () => {
              contenRef.current?.classList.remove('reflected');
              gsap.set('#section2-content', { backgroundColor: 'transparent' });
            },
            onEnterBack: () => {
              contenRef.current?.classList.add('reflected');
            }
          }
        });
        tl.to(contenRef.current, animateTarget);
      } else {
        gsap.set(contenRef.current, animateTarget);
      }
    }, [sectionRef.current, contenRef.current]);

    useGSAP(() => {
      if (!sectionRef.current) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          endTrigger: sectionRef.current,
          start: `${doAnimate ? 'top' : '-60%'} top`,
          end: 'bottom center',

          onEnter: () => {
            play();
          },
          onLeave: () => {
            stop();
          },
          onEnterBack: () => {
            play();
          },
          onLeaveBack: () => {
            stop();
          }
        }
      });
    }, [sectionRef.current]);

    const play = () => {
      if (!videoRef.current) return;
      // videoRef.current.muted = false;
      // gsap.to(videoRef.current, { volume: 1, duration: 2 });
      // console.log("play");

      videoRef.current
        .play()
        .then(() => {})
        .catch(() => {
          if (!videoRef.current) return;
          videoRef.current.muted = true;
          videoRef.current.play();
        });
    };
    const stop = () => {
      if (!videoRef.current) return;
      // gsap.to(videoRef.current, { volume: 0, duration: 2 });

      // console.log("stop");
      videoRef.current.pause();
    };

    return (
      <>
        <section
          {...props}
          ref={sectionRef}
          className={`relative w-full ${
            doAnimate ? 'h-[250vh]' : 'h-screen'
          } z-[2] flex justify-start bg-transparent ${'responsive'}`}
        >
          <div
            ref={wrapperRef}
            id="section2-content-wrapper"
            className="flex h-screen w-full items-center justify-center"
          >
            <div
              style={{ backgroundColor: '#333333', borderRadius: '50px' }}
              id="section2-content"
              ref={contenRef}
              className={`transform- relative grid w-full grid-cols-1 justify-center gap-5 sm:flex sm:items-start ${
                doAnimate ? 'p-5' : 'p-0'
              } reflected`}
            >
              <V3dAboutUS
                className="hidden sm:block"
                scale={0.7}
                parentRef={contenRef}
              />
              <div className="sm:shrink-0 sm:basis-1/2">
                <span className="font-orbit rounded-3xl bg-primary/15 px-5 py-2 uppercase text-primary ">
                  About Us
                </span>
                <h2 className="font-orbit my-3 whitespace-break-spaces text-[30px]  font-semibold uppercase leading-tight text-white sm:text-[36px] md:text-[40px] xl:text-5xl">
                  Vconekt LLC: Igniting Innovation, Empowering Transform ation.
                </h2>
              </div>
              <div className="sm:shrink-0 sm:basis-1/2" ref={vidContainerRef}>
                <div className="pointer-events-auto aspect-[1.94/1] w-full shrink-0 basis-1/2 overflow-hidden rounded-xl">
                  <video
                    src="vconekt_about_us.mp4"
                    muted
                    ref={videoRef}
                    // controls
                    loop
                    autoPlay
                    width={'100%'}
                    height={'100%'}
                  />
                </div>
                <p className="hidden py-2 text-sm font-thin text-white  sm:block">
                  At Vconekt LLC, we are more than just a technology company -
                  we are architects of innovation, proactive IT support for
                  businesses, champions of transformation, and your trusted
                  partner in the digital realm. With over 5 years of experience
                  in the industry, we have honed our expertise to deliver
                  unparalleled solutions and consulting services that drive
                  success for businesses worldwide.
                </p>

                <div className="hidden sm:block">
                  <AnimatedList
                    items={[
                      'Web Design & Development',
                      'SEO & Digital Marketing',
                      'Digital Transformation Consulting',
                      'Custom Software Development'
                    ]}
                  />
                </div>

                <RatingComponent className="hidden sm:block" />

                <span className="hidden text-sm font-thin text-white sm:block">
                  <span className="text-primary">Vision:</span> Revolutionizing
                  the digital landscape, we offer bespoke IT support tailored to
                  businesses' needs, unlocking limitless potential for growth
                  and success.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="responsive relative z-[2] -mt-20">
          <p className="py-2 text-sm font-thin text-white  sm:hidden">
            At Vconekt LLC, we are more than just a technology company - we are
            architects of innovation, proactive IT support for businesses,
            champions of transformation, and your trusted partner in the digital
            realm. With over 5 years of experience in the industry, we have
            honed our expertise to deliver unparalleled solutions and consulting
            services that drive success for businesses worldwide.
          </p>
          <div className="sm:hidden">
            <AnimatedList
              items={[
                'Web Design & Development',
                'SEO & Digital Marketing',
                'Digital Transformation Consulting',
                'Custom Software Development'
              ]}
            />
          </div>
          <RatingComponent className="sm:hidden" />

          <span className="text-sm font-thin text-white sm:hidden">
            <span className="text-primary">Vision:</span> Revolutionizing the
            digital landscape, we offer bespoke IT support tailored to
            businesses' needs, unlocking limitless potential for growth and
            success.
          </span>
        </section>
      </>
    );
  }
);

export function RatingComponent({ className }: { className?: string }) {
  return (
    <span
      className={`mt-3 block w-fit -skew-x-[30deg] bg-[#191919] px-5 py-1 ${className}`}
    >
      <span className="flex w-fit skew-x-[30deg] items-center justify-center gap-2">
        <img src="/rating_icon.png" width={20} alt="" />
        <span className="text-lg text-white">5.0</span>
        <motion.div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((_, i) => {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { duration: 0.2, delay: i * 0.2 }
                }}
              >
                <FaStar className="text-[#FF3D2E]" />
              </motion.span>
            );
          })}
        </motion.div>
      </span>
    </span>
  );
}
