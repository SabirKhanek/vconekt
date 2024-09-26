'use client';
import { OurBlog } from '@/components/site/sections/our_blog';
import Head from 'next/head';
import Link from 'next/link';

export default function BlogsPage() {
  return (
    <div>
      <div className="relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-36 text-white">
        <div className="relative flex h-64 flex-col items-center justify-center">
          {/* <V3dContactUs scale={0.7} /> */}
          <Head>
            <meta
              name="title"
              content="VConekt Blog | Insights & Strategies for Business Growth"
            />
            <meta
              name="description"
              content="Explore the VConekt Blog for expert insights and actionable strategies to fuel business growth. Discover the latest trends in SEO, web design, digital transformation, and more. "
            />
          </Head>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <h2 className="heading uppercase ">Blogs</h2>
            <div className="flex items-center gap-3 font-orbit font-medium ">
              <Link
                href={'/'}
                className="cursor-pointer text-primary hover:underline"
              >
                Home
              </Link>
              <span className="text-primary">/</span>
              <Link href={'/blogs'} className="cursor-pointer hover:underline">
                Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive relative z-[2]">
        <OurBlog onPage />
      </div>
    </div>
  );
}
