import { HTMLProps } from 'react';

const services_with_metas = [
  {
    slug: 'website-development',
    title: 'Web Design & Development',
    meta_title:
      "VConekt's Website Development Service for Your Business Growth",
    meta_description:
      "Get a custom website built by VConket's expert web developers. We deliver high-performing websites that drive results.",
    description:
      'We sculpt digital realms where imagination meets functionality, crafting online experiences that resonate with your audience and leave a lasting impression on every click.',
    highlights: [
      'Custom website design services for unique brands.',
      'Responsive layouts for seamless interaction.',
      'Intuitive navigation for user engagement.',
      'Scalable architecture for future growth.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/web_dev.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Web Development and Design',
      heading: 'How does WordPress development assist your site',
      body: 'When looking for a Web Design and Development service provider, consider factors such as experience, portfolio, communication, pricing, and availability. Have a clear idea of your website goals before approaching a provider. Working with an experienced provider can help ensure a functional and visually appealing website tailored to your needs.'
    },
    what_is_included: [
      {
        heading: 'Improved UI',
        body: 'A well-designed and developed website provides a positive user experience that can lead to increased engagement and conversions.'
      },
      {
        heading: 'Brand Credibility',
        body: "A professional-looking website can help establish your brand's credibility and build trust with potential customers."
      },
      {
        heading: 'Mobile Optimization',
        body: 'A website that is optimized for mobile devices can provide a better user experience for visitors accessing your website from smartphones and tablets.'
      },
      {
        heading: 'Competitive Advantage',
        body: 'A well-designed and developed website can set you apart from your competitors and give you a competitive advantage in your industry.'
      },
      {
        heading: 'Scalability',
        body: 'A website that is designed and developed with scalability in mind can accommodate future growth and changes in your business needs.'
      }
    ]
  },
  {
    slug: 'mobile-app-dev',
    title: 'Mobile App Development',
    video: '/recent_projects.mp4',
    description:
      'In the palm of your hand, we breathe life into ideas, sculpting mobile masterpieces that blend seamless design with captivating functionality, empowering users to explore, engage, and experience your brand like never before.',
    highlights: [
      'Cross-platform compatibility for wider reach.',
      'Intuitive UI/UX design for usability.',
      'Enterprise mobile app development',
      'Robust security features for protection.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/app_dev.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Mobile App Development',
      heading: 'Mobile App Development Service',
      body: 'Elevate your digital reach with our mobile app development services at Vconekt LLC. Our skilled team specializes in crafting innovative and user-centric mobile applications tailored to meet the specific needs of your business. From concept to deployment, we prioritize functionality, design, and performance to ensure your app delivers a seamless and engaging experience for your target audience.'
    },
    what_is_included: [
      {
        heading: 'Enhanced Engagement',
        body: 'Mobile apps provide direct and interactive channels, boosting user engagement and satisfaction.'
      },
      {
        heading: 'Increased Visibility',
        body: "A mobile app on users' devices ensures consistent brand visibility and recall."
      },
      {
        heading: 'Improved Loyalty',
        body: 'Personalized content and loyalty programs in apps enhance customer retention and loyalty.'
      },
      {
        heading: 'Global Reach',
        body: 'Mobile apps enable businesses to access a wider audience globally, expanding market reach.'
      },
      {
        heading: 'Optimized Experience',
        body: 'Mobile apps offer streamlined and user-friendly experiences, optimizing navigation and functionality.'
      },
      {
        heading: 'Data Driven Insight',
        body: 'Mobile app analytics provide valuable insights into user behavior, guiding informed decision-making.'
      }
    ]
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimiztion',
    meta_title: "VConket's SEO Services - Supercharge Your Google Rankings",
    meta_description:
      "Increase website traffic and leads with VConket's proven SEO strategies. We optimize your business for search engines and user experience.",
    description:
      'We are the navigators of the digital sea, charting courses through search algorithms to elevate your online presence, guiding your brand to the shores of visibility, where waves of organic traffic crash upon the sands of success.',
    highlights: [
      'Keyword research and analysis',
      'SEO-driven content creation',
      'Link building for authority establishment.',
      'Technical SEO audits and fixes'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/seo.png"
        className={`h-full max-h-[450px] w-auto ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'SEO',
      heading: 'Search Engine Optimization',
      body: 'Boost your online visibility and drive organic traffic with our Search Engine Optimization (SEO) services at Vconekt LLC. Our dedicated team employs strategic optimization techniques, keyword analysis, and content enhancements to propel your website to the forefront of search engine rankings. Elevate your digital presence and outshine competitors with our tailored SEO solutions.'
    },
    what_is_included: [
      {
        heading: 'Enhanced Visibility',
        body: 'SEO boosts online visibility, improving search engine rankings for increased website traffic.'
      },
      {
        heading: 'Greater Credibility',
        body: 'Higher search rankings establish trust and credibility among users searching for relevant content.'
      },
      {
        heading: 'Effectiive Marketing',
        body: 'SEO offers a cost-effective marketing strategy compared to traditional advertising methods.'
      },
      {
        heading: 'Targetted Traffic',
        body: 'SEO targets specific keywords, attracting relevant traffic interested in your products or services.'
      },
      {
        heading: 'Imprroved UI',
        body: 'Optimized websites provide a better user experience, leading to higher satisfaction and engagement.'
      },
      {
        heading: 'Measurable Results',
        body: 'SEO analytics provide measurable insights, enabling data-driven decision-making for continuous improvement.'
      }
    ]
  },
  {
    slug: 'artificial-intelligence',
    video: '/ai.mp4',
    title: 'Artificial Intelligence',
    meta_title:
      "VConket's AI Solutions to Automate, Analyze & Grow Your Business",
    meta_description:
      'VConket helps businesses leverage AI for automation, marketing, and data analysis. Explore our cutting-edge AI solutions.',
    description:
      'In the realm of data, we are the architects of innovation, weaving threads of intelligence into the fabric of your business, creating automated solutions that anticipate, adapt, and evolve, unlocking the door to a world of endless possibilities.',
    highlights: [
      'Machine learning development services and predictive analytics.',
      'Natural language processing for communication.',
      'AI-driven automation solutions',
      'Personalization for enhanced user experiences.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/ai.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'AI',
      heading: 'Artificial Intelligence',
      body: 'Experience the future of technology with our Artificial Intelligence services at Vconekt LLC. Leveraging cutting-edge AI algorithms, we empower businesses with intelligent automation, data-driven insights, and innovative solutions. From machine learning to natural language processing, our AI services are designed to transform the way you operate, making your systems smarter and more efficient.'
    },
    what_is_included: [
      {
        heading: 'Efficient Automation',
        body: 'AI streamlines tasks, automating processes for increased efficiency and productivity.'
      },
      {
        heading: 'Data Insights',
        body: 'AI analyzes vast datasets, extracting valuable insights for informed decision-making.'
      },
      {
        heading: 'Personalization Experience',
        body: 'AI tailors experiences, providing personalized recommendations and interactions for users.'
      },
      {
        heading: 'Enhanced Security',
        body: 'AI strengthens security measures, detecting and preventing potential threats in real-time.'
      },
      {
        heading: 'Predictive Analytics',
        body: 'AI employs predictive modeling, anticipating trends and behaviors for strategic planning.'
      },
      {
        heading: 'Continuous Learning',
        body: 'AI systems continuously learn and adapt, evolving to handle new challenges and complexities.'
      }
    ]
  },
  {
    slug: 'ui-ux-graphic-design',
    title: 'UI/UX & Graphic Design',
    meta_title: 'VConket: Award-Winning UI/UX & Graphic Design Services',
    meta_description:
      "Create user-friendly interfaces and eye-catching visuals with VConket's UI/UX and graphic design services. Let's craft your brand identity.",
    description:
      'With the stroke of a pixel, we paint the soul of your brand, creating visual symphonies that captivate and engage, weaving narratives through design that resonate with users and elevate your digital presence to an art form.',
    highlights: [
      'User-centered design for optimal experiences.',
      'Wireframing and prototyping for iterative development.',
      'Graphic design for branding and identity.',
      'Interactive design elements for engagement.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/design.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'UI/UX',
      heading: 'UI/UX & Graphic Design',
      body: 'Elevate your brand with our UI/UX & Graphic Design services at Vconekt LLC. Our talented designers blend creativity with functionality, crafting visually stunning and user-friendly designs. From intuitive user interfaces to captivating graphics, we focus on delivering exceptional digital experiences that leave a lasting impression.'
    },
    what_is_included: [
      {
        heading: 'Improved Usability',
        body: 'User-centered design ensures intuitive navigation and ease of use, enhancing user satisfaction.'
      },
      {
        heading: 'Increased Engagement',
        body: 'Interactive elements and visually appealing designs boost user engagement and retention.'
      },
      {
        heading: 'Brand Identity',
        body: 'Consistent and creative graphic design establishes a strong and memorable brand identity.'
      },
      {
        heading: 'Prototyping & Testing',
        body: 'Wireframing and prototyping allow for iterative testing, ensuring optimal functionality and design.'
      },
      {
        heading: 'Customer Loyalty',
        body: 'Exceptional user experiences foster customer loyalty and encourage repeat interactions.'
      },
      {
        heading: 'Cross-Platform Design',
        body: 'Responsive design ensures a seamless experience across all devices and platforms.'
      }
    ]
  }
];

export const services = [
  ...services_with_metas,
  {
    slug: 'blockchain-development',
    title: 'Blockchain Technology',
    meta_title:
      "VConket's Blockchain Development Expertise | Navigate the Future",
    meta_description:
      'VConket builds secure and innovative blockchain applications. Explore how blockchain can transform your business.',
    video: '/blockchain.mp4',
    description:
      'In the digital frontier, we are the pioneers of trust, wielding the power of block-chain to forge unbreakable chains of transparency, securing transactions and building bridges to a future where trust is the currency of choice.',
    highlights: [
      'Transparent and secure transactions.',
      'Smart contract development.',
      'Cryptocurrency exchange development',
      'Decentralized application (DApp) development'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/blockchain.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Blockchain',
      heading: 'Blochain Technology',
      body: 'Embark on a secure and transparent digital journey with our Blockchain Technology services at Vconekt LLC. We specialize in harnessing the power of decentralized ledgers to provide innovative solutions for industries, ensuring trust, efficiency, and immutability in transactions. From smart contract development to blockchain integration, we pave the way for a resilient and tamper-proof digital infrastructure.'
    },
    what_is_included: [
      {
        heading: 'Decentralized Security',
        body: 'Blockchain ensures secure and tamper-resistant transactions through decentralized ledgers.'
      },
      {
        heading: 'Transparent Transactions',
        body: "Blockchain's transparency fosters trust by providing a clear and traceable transaction history."
      },
      {
        heading: 'Smart Contracts',
        body: 'Automated smart contracts execute predefined actions, streamlining and securing processes.'
      },
      {
        heading: 'Reduce Intermediaries',
        body: 'Eliminating intermediaries in blockchain transactions leads to cost savings and efficiency.'
      },
      {
        heading: 'Immutable Record',
        body: "Blockchain's immutability prevents data manipulation, ensuring the integrity of stored information."
      },
      {
        heading: 'Global Accessibility',
        body: 'Blockchain facilitates global transactions, offering accessibility and inclusivity in financial operations.'
      }
    ]
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Management',
    meta_title: "VConket's Social Media Management & Marketing Services",
    meta_description:
      "Reach new customers and build brand loyalty with VConket's data-driven social media marketing strategies.",
    video: '/social.mp4',
    description:
      'From tweets to trends, we orchestrate symphonies of engagement, crafting content that sparks conversations, ignites passions, and transforms followers into loyalists, forging bonds that transcend the digital divide.',
    highlights: [
      'Content curation for audience engagement.',
      'Community management on social platforms',
      'Analytics and insights for optimization.',
      'Crisis management on social platforms'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/social_media_management.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Social Media',
      heading: 'Social Media Management',
      body: 'Amplify your online presence with our Social Media Management services at Vconekt LLC. Our dedicated team tailors strategic campaigns, curates engaging content, and leverages analytics to enhance brand visibility across major social platforms. From community building to data-driven insights, we optimize your social media footprint for impactful online engagement.'
    },
    what_is_included: [
      {
        heading: 'Enhanced Branding',
        body: 'Social media management strengthens brand identity and recognition through consistent online presence.'
      },
      {
        heading: 'Audience Engagement',
        body: 'Active social media management fosters meaningful interactions, building a loyal and engaged audience.'
      },
      {
        heading: 'Data-Driven Strategy',
        body: 'Analytics from social media management inform strategic decisions, optimizing content for better results.'
      },
      {
        heading: 'Promotional Opportunities',
        body: 'Social media platforms provide cost-effective channels for targeted promotions and advertising.'
      },
      {
        heading: 'Real-Time Insights',
        body: 'Monitoring social media in real-time offers insights into trends, sentiments, and user preferences.'
      },
      {
        heading: 'Community Building',
        body: 'Social media management fosters community growth by connecting with and nurturing an online audience.'
      }
    ]
  },
  {
    slug: 'ads-management',
    title: 'Ads Management',
    meta_title: 'Expert Ads Management from VConket | Maximize Your ROI',
    meta_description:
      "Get the most out of your ad campaigns with VConket's professional ads management services. We optimize for conversions and maximize your return on ad spend.",
    video: '/ads',
    description:
      'In the spotlight of the digital stage, we are the conductors of attention, orchestrating campaigns that resonate with the rhythm of your audience, captivating hearts, minds, and clicks with every beat.',
    highlights: [
      'PPC advertising management services',
      'Ad creative optimization.',
      'App advertising campaign management',
      'Performance tracking and analysis.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/ads_management.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Ads',
      heading: 'Ads Management',
      body: 'Maximize your advertising impact with our Ads Management services at Vconekt LLC. From strategic campaign planning to meticulous budget allocation, our experienced team ensures optimized ad placements across various platforms. Elevate your brand visibility and drive results with our data-driven approach to ad management.'
    },
    what_is_included: [
      {
        heading: 'Targetted Reach',
        body: 'Ads management ensures precise targeting, reaching specific audiences for maximum impact.'
      },
      {
        heading: 'Cost-Effective',
        body: 'Efficient budget allocation in ads management optimizes spending for better return on investment.'
      },
      {
        heading: 'Creative Control',
        body: 'Ad management provides control over ad creatives, allowing adjustments for optimal performance.'
      },
      {
        heading: 'Data-Driven Decisions',
        body: 'Analytics in ads management offer insights, guiding data-driven decisions for campaign optimization.'
      },
      {
        heading: 'Increased Visibility',
        body: 'Strategic ads placement boosts brand visibility, increasing awareness among the target audience.'
      },
      {
        heading: 'Conversion Tracking',
        body: 'Ads management enables accurate tracking of conversions, helping measure campaign success and ROI.'
      }
    ]
  },
  {
    slug: 'unity-game-development',
    title: 'Unity Game Development',
    meta_title:
      "VConket's Unity Development Services | Bring Your Games to Life",
    meta_description:
      "Develop engaging and immersive games with VConket's skilled Unity game developers. We turn your game concepts into reality.",
    video: '/unity.mp4',
    description:
      'With lines of code, we weave dreams into reality, sculpting immersive worlds where players become heroes, embarking on epic quests through landscapes of wonder and adventure, where every challenge is a triumph waiting to be won.',
    highlights: [
      'Cross-platform game development',
      'Engaging 2D and 3D designs.',
      'Virtual reality integration.',
      'Multiplayer game development with Unity for social gaming.'
    ],
    Illustration: ({ ...props }: HTMLProps<HTMLElement>) => (
      <img
        {...(props as HTMLProps<HTMLImageElement>)}
        src="/unity_game_dev.png"
        className={`h-[100px] w-[100px] ${props.className}`}
      ></img>
    ),
    what_is_content: {
      tag: 'Game Dev',
      heading: 'Unity Game Development',
      body: 'Dive into the world of immersive gaming experiences with our Unity Game Development services at Vconekt LLC. Our skilled developers leverage the power of Unity to create captivating and interactive games across various genres. From concept to deployment, we blend creativity and technical expertise to bring your gaming vision to life.'
    },
    what_is_included: [
      {
        heading: '3D Environments',
        body: "Unity's capabilities enable the creation of visually stunning and immersive 3D game environments."
      },
      {
        heading: 'Platform Compatibility',
        body: 'Unity allows games to run seamlessly across multiple platforms, reaching a broader audience.'
      },
      {
        heading: 'Multiplayer Functionality',
        body: 'Unity facilitates the integration of multiplayer features, enhancing collaborative and competitive gaming experiences.'
      },
      {
        heading: 'Optimized Performance',
        body: "Unity's efficient coding practices contribute to smooth gameplay and faster loading times in games."
      },
      {
        heading: 'Time and Cost Efficiency',
        body: 'Unity streamlines game development, reducing time and costs compared to building separate versions for each platform.'
      },
      {
        heading: 'Community Support',
        body: "Unity's large and active community provides ample resources, tutorials, and support for developers, fostering collaboration and problem-solving."
      }
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
const service = services[0];
export type ServiceType = typeof service;
