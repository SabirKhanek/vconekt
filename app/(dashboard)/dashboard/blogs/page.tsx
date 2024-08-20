/**
 * The Blogs component displays a table of blog posts, allowing users to view, edit, and delete blog entries.
 *
 * The component fetches the list of blogs from the server using the `getBlogs` function, and stores the data in the `blogs` state.
 * It then renders a table with columns for the blog ID, thumbnail, title, slug, and creation date.
 *
 * Users can click on the "Create New Blog" button to navigate to the blog creation page.
 * They can also click on the "Edit" button to edit a specific blog, or the "Delete" button to delete a blog.
 *
 * The `handleDelete` function is used to delete a blog post, which updates the `blogs` state to remove the deleted blog.
 * The `handleOnCreate` function is called when a new blog is created, which refetches the list of blogs.
 */
'use client';
import { deleteBlog, getBlogs } from '@/app/actions/blogs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { schema } from '@/db';
import { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
function formatDate(date: Date): string {
  const padZero = (num: number): string => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-based
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export default function Blogs() {
  const [blogs, setBlogs] = useState<
    Omit<
      Omit<InferSelectModel<typeof schema.blogs>, 'blog_content'>,
      'blog_content_slate'
    >[]
  >([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      toast({ title: 'Blog Deleted!' });
    } catch (err) {
      toast({ title: 'Failed to delete blog!' });
    }
  };

  function handleOnCreate() {
    fetchBlogs();
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
          <Button variant="outline">
            <Link href={'/dashboard/blogs/new'}>Create New Blog</Link>
          </Button>
        </div>
        <div className="my-5">
          <Table>
            <TableCaption>Blogs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">ID</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-96">Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">{t.id}</TableCell>
                  <TableCell>
                    {t.blog_thumbnail && (
                      <div className="relative h-16 w-24">
                        <Image
                          fill
                          src={t.blog_thumbnail}
                          className="object-cover object-center"
                          alt="cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/${t.slug}`}>{t.blog_title}</Link>
                  </TableCell>
                  <TableCell>{t.slug}</TableCell>
                  <TableCell className="">
                    {t.created_at && formatDate(new Date(t.created_at))}
                  </TableCell>
                  <TableCell className=" flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/blogs/${t.slug}`}>Edit</Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(t.id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
}
