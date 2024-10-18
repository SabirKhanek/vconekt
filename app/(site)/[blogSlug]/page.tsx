import { getBlogBySlug } from '@/app/actions/blogs';
import { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import showdown from 'showdown';

export async function generateMetadata(
  {
    params
  }: {
    params: { blogSlug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.blogSlug;
  const blog = await getBlogBySlug(slug);

  return {
    title: blog?.metadata?.meta_title,
    description: blog?.metadata?.meta_description,
    keywords: blog?.metadata?.target_keyword,
    alternates: {
      canonical: blog?.canonical_url || `https://vconekt.com/${slug}`
    }
  };
}

export default async function BlogPage({
  params
}: {
  params: { blogSlug: string };
}) {
  try {
    const slug = params.blogSlug;
    const blog = await getBlogBySlug(slug);
    if (!blog) return notFound();
    const showdown_converter = new showdown.Converter();
    const content = showdown_converter.makeHtml(blog.blog_content);

    return (
      <div className="responsive relative z-[2] flex flex-col items-center justify-center gap-4  pb-24 pt-36 text-white">
        <Head>
          {blog.metadata?.meta_title && (
            <meta name={'title'} content={blog.metadata.meta_title} />
          )}
          {blog.metadata?.meta_description && (
            <meta
              name={'description'}
              content={blog.metadata.meta_description}
            />
          )}
          {blog.metadata?.target_keyword && (
            <meta name={'keywords'} content={blog.metadata.target_keyword} />
          )}
          {blog.canonical_url && (
            <link rel="canonical" href={blog.canonical_url} />
          )}
        </Head>
        <div className="responsive max-w-screen-768 ">
          <h1 className="text-center font-orbit text-5xl font-bold text-primary">
            {blog.blog_title}
          </h1>
          <div className="my-5 aspect-[1/0.3] w-full">
            <Image
              alt={blog.metadata?.meta_description || ''}
              width={500}
              height={250}
              className=" !h-full !w-full object-cover object-center"
              src={blog.blog_thumbnail}
            ></Image>
          </div>
          {blog.created_at && (
            <p className="text-white/60">
              Posted at: {formatDate(new Date(blog.created_at))}
            </p>
          )}
          <div
            className="prose prose-neutral mx-auto text-white prose-headings:text-primary prose-strong:text-white prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    );
  } catch (err) {
    return notFound();
  }
}
function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
// export default function Test() {
//   return <></>;
// }
