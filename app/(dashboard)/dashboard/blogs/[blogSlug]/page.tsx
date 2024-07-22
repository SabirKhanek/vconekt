'use client';

import { createBlog, editBlog, getBlogBySlug } from '@/app/actions/blogs';
import FileUpload from '@/components/file-upload';
import { PlateEditor } from '@/components/plate-editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { schema } from '@/db';
import { generateSlug, ImgSchema } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { InferSelectModel } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function EditBlogPage() {
  const blogSlug = useParams().blogSlug;
  const [syncedBlog, setSyncedBlog] =
    useState<InferSelectModel<typeof schema.blogs>>();
  const mode = blogSlug !== 'new' ? 'edit' : 'new';

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  async function fetchBlogBySlug() {
    if (mode === 'edit') {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const blog = await getBlogBySlug(blogSlug as string);
        if (!blog) {
          router.push('/dashboard/blogs');
          toast({ title: 'Blog data was not found' });
        } else {
          setSyncedBlog(blog);
        }
      } catch (err: any) {
        router.push('/dashboard/blogs');
        console.log(err);
        toast({ title: 'There was an error while fetching blog data!' });
      } finally {
        setIsLoading(false);
      }
    }
  }
  useEffect(() => {
    fetchBlogBySlug();
  }, []);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {mode.at(0)?.toUpperCase()}
            {mode.substring(1)} Blog
          </h2>
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <ReloadIcon className="animate-spin"></ReloadIcon>
            </div>
          ) : mode === 'new' ? (
            <CreateBlog></CreateBlog>
          ) : (
            syncedBlog && (
              <EditBlog syncedBlog={syncedBlog} resync={fetchBlogBySlug} />
            )
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

const CreateFormSchema = z.object({
  blog_title: z.string().min(1, 'Title is required'),
  blog_content: z.string().min(1, 'Content is required'),
  blog_slug: z.string().min(1, 'Slug is required'),
  blog_content_slate: z.array(z.any()),
  blog_thumbnail: z
    .array(ImgSchema)
    .max(1, 'You can only add 1 thumbnail')
    .min(1, 'You must add cover thumbnail!'),
  meta_title: z.string(),
  meta_description: z.string(),
  image_alt: z.string(),
  target_keywords: z.string()
});

type CreateSchemaType = z.infer<typeof CreateFormSchema>;

function CreateBlog() {
  const form = useForm<CreateSchemaType>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      blog_content: ``,
      blog_content_slate: [
        {
          id: '1',
          type: 'p',
          children: [{ text: '' }]
        }
      ],
      blog_thumbnail: [],
      blog_slug: '',
      blog_title: '',
      image_alt: '',
      meta_description: '',
      meta_title: '',
      target_keywords: ''
    }
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(v: CreateSchemaType) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      console.log(v);
      await createBlog({
        blog_content_slate: v.blog_content_slate,
        blog_content: v.blog_content,
        blog_thumbnail: v.blog_thumbnail.at(0)!.url,
        blog_title: v.blog_title,
        slug: v.blog_slug,
        metadata: {
          image_alt: v.image_alt,
          meta_description: v.meta_description,
          meta_title: v.meta_title,
          target_keyword: v.target_keywords
        }
      });
      toast({ title: 'Blog was created!' });
      router.push(`/dashboard/blogs/${v.blog_slug}`);
    } catch (err: any) {
      toast({
        title: 'There was an error creating the blog',
        description: err.message || 'unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="blog_thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Thumbnail</FormLabel>
              <FormControl>
                <FileUpload
                  onChange={field.onChange}
                  value={field.value}
                  imageLimit={1}
                  onRemove={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="blog_title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter blog title"
                    {...field}
                    onChange={(e) => {
                      form.setValue(
                        'blog_slug',
                        generateSlug(e.target.value || '')
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blog_slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Blog Slug</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter meta title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter meta description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="image_alt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image Alt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title image alt"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_keywords"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Target Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="Enter target keyword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="blog_content_slate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <PlateEditor
                  onMarkdownChanged={(v) => form.setValue('blog_content', v)}
                  editorValue={field.value}
                  setEditorValue={field.onChange}
                  initialValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="my-5 flex items-center gap-5"
          disabled={isLoading}
          type="submit"
        >
          Save Blog{' '}
          {isLoading && <ReloadIcon className="animate-spin"></ReloadIcon>}
        </Button>
      </form>
    </Form>
  );
}
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

function EditBlog({
  syncedBlog,
  resync
}: {
  syncedBlog: InferSelectModel<typeof schema.blogs>;
  resync: () => any;
}) {
  const form = useForm<CreateSchemaType>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      blog_content: syncedBlog.blog_content,
      blog_content_slate: syncedBlog.blog_content_slate || [
        {
          id: '1',
          type: 'p',
          children: [{ text: '' }]
        }
      ],
      blog_thumbnail: [
        {
          url: syncedBlog.blog_thumbnail,
          fileUrl: syncedBlog.blog_thumbnail,
          fileKey: syncedBlog.blog_thumbnail,
          fileName: syncedBlog.blog_thumbnail,
          fileSize: 5,
          key: '1',
          name: syncedBlog.blog_thumbnail,
          size: 5
        }
      ],
      blog_slug: syncedBlog.slug,
      blog_title: syncedBlog.blog_title,
      image_alt: syncedBlog.metadata?.image_alt,
      meta_description: syncedBlog.metadata?.meta_description,
      meta_title: syncedBlog.metadata?.meta_title,
      target_keywords: syncedBlog.metadata?.target_keyword
    }
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(v: CreateSchemaType) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await editBlog(syncedBlog.id, {
        content_obj: v.blog_content_slate,
        content: v.blog_content,
        thumbnail: v.blog_thumbnail.at(0)!.url,
        title: v.blog_title,
        metadata: {
          image_alt: v.image_alt,
          meta_description: v.meta_description,
          meta_title: v.meta_title,
          target_keyword: v.target_keywords
        }
      });
      toast({ title: 'Blog was updated!' });
      resync();
    } catch (err: any) {
      toast({
        title: 'There was an error updating the blog',
        description: err.message || 'unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {syncedBlog.updated_at && (
          <p className="text-sm">
            Last updated at: {formatDate(new Date(syncedBlog.updated_at))} 🎉
          </p>
        )}
        <FormField
          control={form.control}
          name="blog_thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Thumbnail</FormLabel>
              <FormControl>
                <FileUpload
                  onChange={field.onChange}
                  value={field.value}
                  imageLimit={1}
                  onRemove={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="blog_title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter blog title"
                    {...field}
                    onChange={(e) => {
                      form.setValue(
                        'blog_slug',
                        generateSlug(e.target.value || '')
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blog_slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Blog Slug</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter meta title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter meta description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="image_alt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image Alt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title image alt"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target_keywords"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Target Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="Enter target keyword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="blog_content_slate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <PlateEditor
                  onMarkdownChanged={(v) => form.setValue('blog_content', v)}
                  editorValue={field.value}
                  setEditorValue={field.onChange}
                  initialValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="my-4 flex items-center gap-5"
          disabled={isLoading}
          type="submit"
        >
          Save Blog{' '}
          {isLoading && <ReloadIcon className="animate-spin"></ReloadIcon>}
        </Button>
      </form>
    </Form>
  );
}
