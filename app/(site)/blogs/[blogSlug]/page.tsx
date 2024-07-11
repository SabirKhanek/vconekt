import { getBlogBySlug } from '@/app/actions/blogs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import showdown from 'showdown';
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
        <div className="responsive max-w-screen-768 ">
          <h1 className="font-orbit text-center text-5xl font-bold text-primary">
            {blog.blog_title}
          </h1>
          <div className="my-5 aspect-[1/0.3] w-full">
            <Image
              alt="blog-thumbnail"
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
            className="prose prose-neutral prose-strong:text-white prose-headings:text-primary mx-auto text-white"
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
