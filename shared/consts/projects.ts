export interface Project {
  title: string;
  slug: string;
  involvements: string[];
  targetUrl: string;
  about: string;
  mainThumb: { src: string; type: 'image' };
  samples: { src: string; type: 'image' | 'video' }[];
  review: {
    authorName: string;
    authorImage: string;
    authorCompany: string;
    text: string;
  };
  short_desc: string;
}

export const projects: Project[] = [
  {
    short_desc:
      'Best guitar Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, officiis?',
    title: 'Best Guitar Instruments',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    involvements: ['Mobile App', 'Web App', 'E-commerce'],
    mainThumb: {
      src: `/bank_contact_info.png`,
      type: 'image'
    },
    review: {
      text: 'Olga is one of the smartest designers I have ever worked with. One of her outstanding skills as a designer is that she is a great listener. She will take client requirements and expertly solve complex problems. She can take her vast design experience and combine it with technology to come up with fantastic designs on point, and on time. Her many award winning designs speak for her talent and process.',
      authorCompany: 'Director Fast Track Company',
      authorImage: `https://picsum.photos/80?t=${Math.random()}`,
      authorName: 'John Doe'
    },
    samples: [
      { src: '/vconekt_about_us.mp4', type: 'video' },
      {
        src: `https://picsum.photos/1200/592?t=${Math.random()}`,
        type: 'image'
      }
    ],
    slug: 'best_guitar_instruments',
    targetUrl: '#'
  },
  {
    short_desc:
      'Activ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, officiis?',
    title: 'Activ',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    involvements: ['Mobile App', 'Web App', 'E-commerce'],
    mainThumb: {
      src: `/Activcon.png`,
      type: 'image'
    },
    review: {
      text: 'Olga is one of the smartest designers I have ever worked with. One of her outstanding skills as a designer is that she is a great listener. She will take client requirements and expertly solve complex problems. She can take her vast design experience and combine it with technology to come up with fantastic designs on point, and on time. Her many award winning designs speak for her talent and process.',
      authorCompany: 'Director Fast Track Company',
      authorImage: `https://picsum.photos/80?t=${Math.random()}`,
      authorName: 'John Doe'
    },
    samples: [
      { src: '/activ_1.png', type: 'image' },
      {
        src: `/activ_2.png`,
        type: 'image'
      },
      {
        src: `/Activcon-1.png`,
        type: 'image'
      }
    ],
    slug: 'activ',
    targetUrl: '#'
  },
  {
    short_desc:
      'Fast track Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, officiis?',
    title: 'Fast Track',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    involvements: ['Mobile App', 'Web App', 'E-commerce'],
    mainThumb: {
      src: `/domain_market.png`,
      type: 'image'
    },
    review: {
      text: 'Olga is one of the smartest designers I have ever worked with. One of her outstanding skills as a designer is that she is a great listener. She will take client requirements and expertly solve complex problems. She can take her vast design experience and combine it with technology to come up with fantastic designs on point, and on time. Her many award winning designs speak for her talent and process.',
      authorCompany: 'Director Fast Track Company',
      authorImage: `https://picsum.photos/80?t=${Math.random()}`,
      authorName: 'John Doe'
    },
    samples: [{ src: '/fast_track_1.png', type: 'image' }],
    slug: 'fast_track',
    targetUrl: '#'
  },
  {
    short_desc:
      'Boldare Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, officiis?',
    title: 'Boldare',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    involvements: ['Mobile App', 'Web App', 'E-commerce'],
    mainThumb: {
      src: `/dragon_smokestore.png`,
      type: 'image'
    },
    review: {
      text: 'Olga is one of the smartest designers I have ever worked with. One of her outstanding skills as a designer is that she is a great listener. She will take client requirements and expertly solve complex problems. She can take her vast design experience and combine it with technology to come up with fantastic designs on point, and on time. Her many award winning designs speak for her talent and process.',
      authorCompany: 'Director Fast Track Company',
      authorImage: `https://picsum.photos/80?t=${Math.random()}`,
      authorName: 'John Doe'
    },
    samples: [
      { src: '/boldare_1.png', type: 'image' },
      { src: '/boldare_2.png', type: 'image' },
      { src: '/boldare_3.png', type: 'image' }
    ],
    slug: 'boldare',
    targetUrl: '#'
  }
];
