'use client';
import { HTMLProps, useEffect, useRef, useState } from 'react';

import { ReactRef, useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { motion, useInView } from 'framer-motion';
import { useResponsive } from '@/components/site/useResponsive';
import Link from 'next/link';

export function OurServices({ ...props }: HTMLProps<HTMLElement>) {
  const responsive = useResponsive();

  if (responsive.windowWidth < 1024)
    return (
      <ServiceSectionSmall
        responsive={responsive}
        {...props}
      ></ServiceSectionSmall>
    );
  else
    return (
      <ServiceSectionLarge
        responsive={responsive}
        {...props}
      ></ServiceSectionLarge>
    );
}

function ServiceSectionSmall({
  responsive,
  ...props
}: { responsive: ReturnType<typeof useResponsive> } & HTMLProps<HTMLElement>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        endTrigger: scrollContainerRef.current,
        pin: true,
        pinnedContainer: containerRef.current,
        pinSpacing: false,
        scrub: true,
        snap: {
          snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: 'linear'
        }
      }
    });

    tl.to(
      {},
      {
        onUpdate: () => {
          const progress = tl.progress();
          // console.log(progress);
          // console.log({
          //   progress,
          //   scrollWidth: sliderRef.current?.scrollWidth,
          //   scrollBy: progress * (sliderRef.current?.scrollWidth || 0),
          // });
          sliderRef.current?.scroll({
            left: progress * sliderRef.current.scrollWidth,
            behavior: 'instant'
          });
        },
        scrub: true
      }
    );
  }, []);
  return (
    <>
      <div
        {...(props as any)}
        ref={scrollContainerRef}
        className="responsive relative z-[2] -mt-14 h-[300vh]"
      >
        <div
          ref={containerRef}
          className="flex h-screen flex-col justify-center"
        >
          <span className="w-fit rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary">
            Our Digital Services
          </span>
          <p className="heading my-5 font-orbit text-[5vw] font-semibold !leading-tight max-lm:!max-h-full max-lm:!text-[34px]">
            Tailored <span className="text-primary">Digital Solutions</span> for
            Your Business Growth
          </p>
          <ServiceCardSliderSmall sliderRef={sliderRef} />
        </div>
      </div>
      <p className="responsive relative z-[2] -mt-10">
        VConekt is a leading software development and digital marketing company
        specializing in innovative digital solutions. Our experienced team
        offers a comprehensive suite of services, including web development,
        mobile app development, SEO, PPC, SMM, automation, lead generation and
        360-degree digital marketing. We craft stunning, responsive websites
        optimized for search engines, create intuitive mobile apps, and employ
        effective digital marketing strategies to boost your online visibility,
        drive traffic, and generate leads. With a focus on quality, innovation,
        and client satisfaction, we are committed to helping your business
        thrive in the digital age.
      </p>
    </>
  );
}

function ServiceCardSliderSmall({ sliderRef }: { sliderRef: ReactRef }) {
  return (
    <div
      id={'service_slider'}
      ref={sliderRef}
      className="no-scrollbar flex items-center justify-start gap-7 overflow-x-auto"
    >
      {[...Array(5)].map((_, i, arr) => {
        return (
          <ServiceCard
            index={i}
            total={arr.length}
            key={i}
            {...cardDetails[i % (cardDetails.length - 1)]}
          ></ServiceCard>
        );
      })}
    </div>
  );
}

function ServiceCard({
  description,
  link,
  title,
  index
}: // index,
// total,
(typeof cardDetails)[0] & { index: number; total: number }) {
  return (
    <div
      style={{
        transformOrigin: 'bottom center',
        borderRadius: '6px',
        display: 'flex'
      }}
      className={`black-gradient flex aspect-square h-72 w-72 snap-center items-center justify-center p-7 text-white`}
    >
      <span className="inline-flex h-full w-full flex-col gap-2">
        <img
          src={cardIcons[index % cardIcons.length]}
          alt=""
          className="h-10 w-10"
        />
        <div>
          <h2 className="text-left">{title}</h2>
          <p className="mt-2 text-left text-sm font-thin">{description}</p>
        </div>
        <a
          className="text-left font-medium text-primary hover:underline"
          href={link}
        >
          Learn more...
        </a>
      </span>
    </div>
  );
}

function ServiceSectionLarge({
  responsive,
  ...props
}: { responsive: ReturnType<typeof useResponsive> } & HTMLProps<HTMLElement>) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    // cursorTimeline.to(".type_cursor", { opacity: 0.2, duration: 0.5 });
    // new SplitType("#presence_text", {
    //   types: "chars",
    //   charClass: "presence_text_letter",
    // });
    // const textTimeline = gsap.timeline({
    //   repeat: -1,
    //   yoyo: true,
    //   repeatDelay: 1,
    // });
    // textTimeline.fromTo(
    //   ".presence_text_letter",
    //   { display: "none" },
    //   {
    //     display: "inline-block",
    //     duration: 0.01,
    //     stagger: 0.04,
    //   }
    // );

    new SplitType('#presence_text', {
      types: ['chars', 'words'],
      charClass: 'presence_letter',
      wordClass: 'break-none'
    });
    const cursorTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTimeline.to('.type_cursor', { opacity: 0.2, duration: 0.5 });
    const tl = gsap.timeline({});
    tl.fromTo(
      '.presence_letter',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.01,
        stagger: 0.04
      }
    );
  }, [isInView]);
  const calcCardWidth = () => {
    const slider = document.getElementById('service_slider');
    return ((slider?.clientWidth || 1024) / 3) * (4 / 5);
  };
  const [cardWidth, setCardWidth] = useState(calcCardWidth());

  useEffect(() => {
    setCardWidth(calcCardWidth());
  }, [responsive.windowWidth]);
  useGSAP(
    () => {
      if (responsive.windowWidth < 1024) return;
      if (!ref.current) return;
      const slider = document.getElementById('service_slider');
      if (!slider) return;
      const targets = Array.from(
        document.querySelectorAll('.service-card')
      ).reverse();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          pinnedContainer: contentRef.current,
          scrub: true,
          onEnter: () => {},
          snap: {
            snapTo: [
              0,
              ...targets.map((v, index) => {
                v;
                return (0.182 / 2) * (index + 1);
              })
            ],
            duration: 0.182
          }
        }
      });
      const animationProps = {
        start: {
          x: 0,
          y: 0,
          backgroundColor: 'blue',
          scale: 1,
          gradFrom: '#131A14',
          fadeGradFrom: '#000000',
          fadeGradDirection: '0deg',
          fadeGradFromPer: '15%',
          fadeGradTo: '#00000000',
          fadeGradToPer: '100%',
          gradTo: '#000000',
          gradFromPer: 0,
          gradToPer: 100,
          gradDirection: '180deg'
        },
        center: {
          x: slider.clientWidth / 2 - cardWidth / 2,
          y: -(slider.clientHeight - cardWidth),
          backgroundColor: 'red',
          scale: 1.2,
          fadeGradFrom: 'rgba(0,0,0,0)',
          fadeGradDirection: '90deg',
          fadeGradFromPer: '15%',
          fadeGradTo: '#00000000',
          fadeGradToPer: '100%',
          gradFrom: '#131A14',
          gradTo: '#253426',
          gradFromPer: 1.97,
          gradToPer: 97.62,
          gradDirection: 47
        },
        end: {
          x: slider.clientWidth - cardWidth,
          y: 0,
          backgroundColor: 'blue',
          scale: 1,
          fadeGradFrom: 'rgba(0,0,0,1)',
          fadeGradDirection: '0deg',
          fadeGradFromPer: '15%',
          fadeGradTo: '#00000000',
          fadeGradToPer: '100%',
          gradFrom: '#131A14',
          gradTo: 'black',
          gradFromPer: 0,
          gradToPer: 100,
          gradDirection: 180
        }
      };
      const radius = slider.clientWidth / 3;
      const dur = 2;
      var controlPoint1 = {
        x: animationProps.center.x - radius,
        y: animationProps.center.y / 2
      };
      var controlPoint2 = {
        x: animationProps.center.x + radius,
        y: animationProps.center.y / 2
      };

      const getInterpolations = (startObj: any, endObj: any, progress: any) => {
        const interpolations: any = {};
        Object.keys(startObj).forEach((key) => {
          interpolations[key] = gsap.utils.interpolate(
            startObj[key],
            endObj[key],
            progress
          );
        });
        return interpolations;
      };

      gsap.utils.toArray(targets).forEach((target: any, index) => {
        tl.fromTo(
          target,
          {
            x: animationProps.start.x,
            y: animationProps.start.y,
            // backgroundColor: animationProps.start.backgroundColor,
            background: `linear-gradient(${animationProps.start.gradDirection}deg, ${animationProps.start.gradFrom} ${animationProps.start.gradFromPer}%, ${animationProps.start.gradTo} ${animationProps.start.gradToPer}%)`,
            scale: animationProps.start.scale
          },
          {
            motionPath: {
              path: [
                controlPoint1,
                { x: animationProps.center.x, y: animationProps.center.y }, // Control Point 1
                controlPoint2,
                { x: animationProps.end.x, y: animationProps.end.y }
              ]
            },
            onUpdate: () => {
              if (window.scrollY <= 0) return;
              const timeWithDelay = tl.duration();
              const delayProgress = tl.progress();
              const actualCurrentTime = timeWithDelay * delayProgress;
              const totalCurrentTime = actualCurrentTime + (dur / 2) * index;
              // const totalTimeProgress = totalCurrentTime / totalTime;
              //const totalTimeProgress = 0 // please map delayProgress (based on timeWithDelay) to totalTimeProgress (based on totalTime)
              const startTimeForTarget = index * dur;
              const currentTimeTarget = totalCurrentTime - startTimeForTarget;

              const progress = currentTimeTarget / dur; // want to get progress of individual tween keep in mind -=${dur/2}

              if (progress <= -1 || progress > 1) return;
              let interpolations: {
                [K in keyof (typeof animationProps)['start']]: (typeof animationProps)['start'][K];
              } = animationProps.start;
              let gradient;
              gradient;
              if (progress < 0.5) {
                interpolations = getInterpolations(
                  animationProps.start,
                  animationProps.center,
                  progress * 2
                );
                gradient = `linear-gradient(${interpolations.gradDirection}, ${interpolations.gradFrom} ${interpolations.gradFromPer}, ${interpolations.gradTo} ${interpolations.gradToPer})`;
              } else {
                interpolations = getInterpolations(
                  animationProps.center,
                  animationProps.end,
                  (progress - 0.5) * 2
                );
                gradient = `linear-gradient(${interpolations.gradDirection}, ${interpolations.gradFrom} ${interpolations.gradFromPer}, ${interpolations.gradTo} ${interpolations.gradToPer})`;
              }
              const fadeGradient = `linear-gradient(${interpolations.fadeGradDirection}, ${interpolations.fadeGradFrom} ${interpolations.fadeGradFromPer}, ${interpolations.fadeGradTo} ${interpolations.fadeGradToPer})`;

              gsap.set(target.getElementsByClassName('fade_mask')[0], {
                background: fadeGradient
              });
              gsap.set(target, {
                // background: gradient,
                scale: interpolations.scale
              });
              setRefreshFlag({});
            },
            onComplete: () => {
              gsap.set(target, {
                // backgroundColor: animationProps.end.backgroundColor,
                scale: animationProps.end.scale,
                // background: `linear-gradient(${animationProps.end.gradDirection}, ${animationProps.end.gradFrom} ${animationProps.end.gradFromPer}, ${animationProps.end.gradTo} ${animationProps.end.gradToPer})`,
                x: animationProps.end.x,
                y: animationProps.end.y
              });
            },
            ease: 'none',
            duration: dur
          },
          `-=${dur / 2}`
        );
      });
      return () => {
        tl.kill();
      };
    },
    {
      dependencies: [responsive.windowWidth, ref.current, contentRef.current],
      scope: ref,
      revertOnUpdate: true
    }
  );
  const [zIndexes, setZIndexes] = useState<number[]>([]);
  const [refreshFlag, setRefreshFlag] = useState({});
  const [hiddenFlags, setHiddenFlags] = useState<boolean[]>([]);
  useEffect(() => {
    if (responsive.windowWidth < 1024) return;
    const targets = Array.from(document.querySelectorAll('.service-card'));
    const slider = document.getElementById('service_slider');
    if (!slider) return;
    const centeredPos = slider?.clientWidth / 2 - cardWidth / 2;
    const zindarr: number[] = targets.map((target, index) => {
      const targetX = gsap.getProperty(target, 'translateX');
      if ((targetX as number) < centeredPos) {
        return index * 5;
      } else {
        return (targets.length + 1 - index) * 5;
      }
    });
    const hiddenCards = [];

    for (let i = 0; i < targets.length; i++) {
      if (i < targets.length - 2) hiddenCards[i] = true;
      else hiddenCards[i] = false;
    }

    targets.forEach((target, index) => {
      const targetX = gsap.getProperty(target, 'translateX');
      if ((targetX as number) >= centeredPos) {
        if (index - 2 >= 0) {
          hiddenCards[index - 2] = false;
        }
      }
    });
    setHiddenFlags(hiddenCards);
    setZIndexes(zindarr as number[]);
  }, [refreshFlag]);

  return (
    <motion.section
      ref={ref}
      {...(props as any)}
      id="our_services"
      className={`relative z-[2]  hidden h-[300vh] w-full items-center justify-center overflow-hidden bg-transparent text-white  lg:flex`}
    >
      <div
        ref={contentRef}
        id="our_services_content"
        className={`absolute left-1/2 top-0 flex h-screen w-full -translate-x-1/2 justify-center py-[5vh] ${'responsive'}`}
      >
        <div
          className={`overflow absolute bottom-[5vh] h-1/2 w-full max-w-5xl`}
          ref={sliderContainerRef}
          id="service_slider"
        >
          {/* <div className="absolute h-full w-1left-1/2 -translate-x-1/2"></div> */}
          {[...Array(cardDetails.length)].reverse().map((v, index) => {
            return (
              <div
                key={index}
                style={{
                  width: cardWidth,
                  height: cardWidth,
                  transformOrigin: 'bottom center',
                  borderRadius: '6px',
                  translate: 'translateX(0)',
                  zIndex: zIndexes[index],
                  display: hiddenFlags[index] ? 'none' : 'flex'
                }}
                className={`service-card black-gradient absolute bottom-0 left-0 flex items-center justify-center p-7 text-white`}
              >
                <span className="inline-flex h-full w-full flex-col gap-2">
                  {/* <span>{cardDetails[index % cardDetails.length].logo}</span> */}
                  <img
                    src={`${cardIcons[index % cardIcons.length]}`}
                    alt=""
                    className="h-10 w-10"
                  />
                  <div>
                    <h2 className="text-left">
                      {cardDetails[index % cardDetails.length].title}
                    </h2>
                    <p className="mt-2 text-left text-sm font-thin">
                      {cardDetails[index % cardDetails.length].description}
                    </p>
                  </div>
                  <Link
                    className="text-left font-medium text-primary hover:underline"
                    href={cardDetails[index % cardDetails.length].link}
                  >
                    Learn more...
                  </Link>
                </span>
                <div
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                    width: '100%',
                    height: '100%'
                  }}
                  className="inner_fade fade_mask pointer-events-none absolute left-0 top-0"
                ></div>
              </div>
            );
          })}
        </div>

        <div
          className={`z-10 flex h-full w-full flex-col items-start justify-between`}
        >
          <div className="flex w-full justify-between gap-6">
            <div className="shrink-0 basis-1/2">
              <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary">
                Our Digital Services
              </span>
              <p
                id="presence_text"
                className="my-5 font-orbit  font-semibold leading-relaxed md:text-[40px] xl:text-5xl"
              >
                Tailored <span className="text-primary">Digital Solutions</span>{' '}
                For Your Business Growth
                <span className="presence_letter type_cursor ml-2 inline-block h-9 w-1 bg-primary"></span>
              </p>
            </div>
            <div className="max-w-96 shrink-0 basis-1/2">
              <p className="pt-10 text-sm font-light text-white">
                VConekt is a leading software development and digital marketing
                company specializing in innovative digital solutions. Our
                experienced team offers a comprehensive suite of services,
                including web development, mobile app development, SEO, PPC,
                SMM, automation, lead generation and 360-degree digital
                marketing. We craft stunning, responsive websites optimized for
                search engines, create intuitive mobile apps, and employ
                effective digital marketing strategies to boost your online
                visibility, drive traffic, and generate leads. With a focus on
                quality, innovation, and client satisfaction, we are committed
                to helping your business thrive in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
const cardIcons = ['cardIcon1.svg', 'cardIcon2.svg', 'cardIcon3.svg'];
const cardDetails = [
  {
    title: 'Graphics & UI design',
    description:
      'Elevate brand aesthetics and user experiences with our Graphic and UI Design solutions.',
    link: '/services/ui_ux'
  },
  {
    title: 'Web design & develoment',
    description:
      'Transforming visions into digital realities with Web Design & Development expertise.',
    link: '/services/web_design_and_development'
  },
  {
    title: 'Digital Media Marketing',
    description:
      'Drive audience engagement and brand visibility with tailored Digital Media Marketing strategies.',
    link: '#'
  },
  {
    title: 'Mobile App Development',
    description:
      'In your hand, we sculpt captivating mobile experiences that empower brand exploration like never before.',
    link: '/services/mobile_app_dev'
  },
  {
    title: 'Search Engine Optimization',
    description:
      'We guide your brand through digital waters, navigating search algorithms to boost online visibility and ride waves of organic traffic to success.',
    link: '/services/seo'
  },
  {
    title: 'B2B Marketing Solutions',
    description:
      'Unlock your B2B potential with customized digital marketing strategies designed to meet your unique business objectives.',
    link: '/'
  },
  {
    title: 'Strategic Outsourcing',
    description:
      'Enhance your marketing flexibility with our strategic outsourcing solutions, allowing you to focus on core business functions effortlessly.',
    link: '/'
  },
  {
    title: 'Digital Marketing Services',
    description:
      'Experience innovative digital marketing services that leverage data-driven insights to achieve exceptional results and maximize engagement.',
    link: '/'
  },
  {
    title: 'Custom Application',
    description:
      'Transform your business operations with our tailored application development services, creating innovative solutions that drive efficiency and growth.',
    link: '/'
  },
  {
    title: 'AI Chatbot Development',
    description:
      'Revolutionize customer service with our AI chatbot development, providing intelligent, responsive solutions that enhance user experience and operational efficiency.',
    link: '/'
  },
  {
    title: 'Pay Per Click Services',
    description:
      'Maximize your ROI with our expertly managed PPC marketing services, targeting the right audience for effective and efficient campaigns.',
    link: '/'
  },
  {
    title: 'Content Marketing Services',
    description:
      'Elevate your brand with high-quality, engaging content marketing strategies that align with your business goals and attract your target audience.',
    link: '/'
  },
  {
    title: 'CRO Services',
    description:
      'Optimize your website for maximum conversions using our CRO services, enhancing user experience to boost sales and customer satisfaction.',
    link: '/'
  },
  {
    title: 'eCommerce Services',
    description:
      'Drive online sales growth with our specialized eCommerce marketing services focused on SEO, paid advertising, and user experience optimization.',
    link: '/'
  },
  {
    title: 'Online Marketplace Services',
    description:
      'Increase visibility and sales on platforms like Amazon with our expert online marketplace marketing services tailored to build strong brand presence.',
    link: '/'
  },
  {
    title: 'Artificial Intelligence',
    description:
      'In the data realm, we architect innovation, weaving intelligence into your business fabric, crafting automated solutions that anticipate, adapt, and evolve, unlocking endless possibilities.',
    link: '/services/ai'
  },
  {
    title: 'Blockchain',
    description:
      'We pioneer trust in the digital frontier, using blockchain to secure transactions and forge transparent pathways to a future where trust is currency.',
    link: '/services/blockchain'
  },
  {
    title: 'Social Media Management',
    description:
      'We spark conversations, ignite passions, and forge loyal bonds from tweets to trends, bridging the digital divide with engaging content.',
    link: '/services/social_media_management'
  },
  {
    title: 'Ads Management',
    description:
      "As conductors on the digital stage, we orchestrate campaigns that resonate with your audience's rhythm, captivating hearts, minds, and clicks with every beat.",
    link: '/services/ads_management'
  },
  {
    title: 'Unity Game Development',
    description:
      'We code dreams into reality, crafting immersive worlds where players become heroes, triumphing over challenges in epic quests.',
    link: '/services/unity_game_development'
  }
];
