'use client';
import { HTMLProps, useEffect, useRef, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from '../button';
import Link from 'next/link';
import { getBlogs } from '@/app/actions/blogs';

interface Blogs extends HTMLProps<HTMLElement> {
  onPage?: boolean;
}

export function OurBlog({ onPage = false, ...props }: Blogs) {
  useGSAP(() => {
    const containers = Array.from(
      document.getElementsByClassName('blog_image_container')
    );

    containers.forEach((container) => {
      gsap.to(container.children[0], {
        y: '-30%',
        scrollTrigger: {
          trigger: container,
          endTrigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);
  const [blogs, setBlogs] = useState<Awaited<ReturnType<typeof getBlogs>>>([]);
  async function fetchBlogs() {
    try {
      const res = await getBlogs();
      setBlogs(res);
    } catch (err: any) {}
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <motion.section
      {...(props as any)}
      className={`${'responsive'} relative z-10 my-10 w-full`}
    >
      {!onPage ? (
        <div className="relative">
          <span className="rounded-3xl bg-primary/15 px-5 py-2 font-orbit uppercase text-primary ">
            Stay Ahead of the Curve with Expert Insights
          </span>
          <div className="flex flex-col gap-1">
            <p
              className="heading mt-5  font-orbit text-[5vw] font-semibold !leading-tight text-white max-lm:!max-h-full max-lm:!text-[34px]"
              style={{ textTransform: 'capitalize' }}
            >
              Discover valuable insights, tips, and trends in design,
              development, and marketing through our informative blog. Our
              articles are curated to help you stay ahead of the competition and
              achieve your digital goals.
            </p>
            <Link href="/blogs">
              <Button className="w-fit sm:hidden">View All</Button>
            </Link>
          </div>
          <Link href="/blogs">
            <Button className="absolute bottom-0 right-0 !hidden sm:!flex">
              View All
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mb-16 w-full max-w-[80%]">
          <h2 className="heading font-orbit">
            Stay Ahead of the Curve with{' '}
            <span className="text-primary">Expert Insights</span>
          </h2>
          <p className="max-w-[350px] text-sm font-light">
            Discover valuable insights, tips, and trends in design, development,
            and marketing through our informative blog.Our articles are curated
            to help you stay ahead of the competition and achieve your digital
            goals.
          </p>
        </div>
      )}
      <ul className="my-4 text-white">
        {blogs.map((v, i) => (
          <BlogCard key={i} blog={v} />
        ))}
      </ul>
      {onPage && (
        <div className="my-10 flex items-center justify-center">
          <Button>Load More</Button>
        </div>
      )}
    </motion.section>
  );
}

function BlogCard({
  blog
}: {
  blog: Awaited<ReturnType<typeof getBlogs>>[number];
}) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.li
      ref={ref}
      style={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
      className="border-collapse border-b border-t border-white transition-all duration-200"
    >
      <div className="flex  flex-col gap-4 py-6 md:flex-row">
        <div className="blog_image_container_d h-[260px] w-full shrink-0 overflow-hidden md:w-[380px]">
          <img
            className="blog_images_d h-[100%] w-full cursor-pointer object-cover object-center"
            src={blog.blog_thumbnail}
            alt=""
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full items-start justify-between gap-7">
            <div className="flex-col gap-1">
              <Link href={`/${blog.slug}`}>
                <h2 className="small-heading cursor-pointer text-wrap font-orbit text-[36px] font-semibold text-primary hover:underline">
                  {blog.blog_title}
                </h2>
              </Link>
              <p>{blog.metadata?.meta_description}</p>
            </div>
            <Link href={`/${blog.slug}`}>
              <motion.button
                initial={{
                  background:
                    'radial-gradient(circle closest-side, #fff 0%, transparent 0%)',
                  scale: 1
                }}
                whileHover={{
                  background:
                    'radial-gradient(circle closest-side, #fff 100%, transparent 100%)',
                  scale: 1.2,
                  color: '#000'
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="hidden rounded-full border border-white bg-transparent p-3 transition-all duration-150 hover:scale-110 520:flex 768:hidden lg:flex"
              >
                <GoArrowRight className="-rotate-[30deg] text-3xl" />
              </motion.button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-light text-white">Agency</span>
              <span className="text-sm font-light text-white">Branding</span>
            </div>
            {blog.created_at && (
              <span className="text-sm text-white/50">
                {formatDate(new Date(blog.created_at))}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
