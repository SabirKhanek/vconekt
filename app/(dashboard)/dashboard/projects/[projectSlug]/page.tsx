/**
 * The `EditProject` component is responsible for rendering the edit project form. It takes in the `syncedProject` object, which contains the project data, and a `resync` function to refresh the project data.
 *
 * The component uses the `useForm` hook from `react-hook-form` to manage the form state and validation. The form fields include the project title, slug, involvements, target URL, about, short description, main thumbnail, samples, and review information.
 *
 * When the form is submitted, the `handleSubmit` function is called, which updates the project data using the `editProject` function from the `@/app/actions/projects` module. If the update is successful, a success toast message is displayed, and the `resync` function is called to refresh the project data.
 *
 * @param {Object} props - The component props.
 * @param {InferSelectModel<typeof schema.projects>} props.syncedProject - The project data to be edited.
 * @param {() => any} props.resync - A function to refresh the project data.
 * @returns {JSX.Element} - The `EditProject` component.
 */
'use client';

import { createBlog, editBlog, getBlogBySlug } from '@/app/actions/blogs';
import {
  createProjecct,
  editProject,
  getProjectBySlug
} from '@/app/actions/projects';
import FileUploadImage from '@/components/file-upload';
import FileUpload from '@/components/file-uploader-v2';
import { Icons } from '@/components/icons';
import { PlateEditor } from '@/components/plate-editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { schema } from '@/db';
import { generateSlug, ImgSchema } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { InferSelectModel } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadFileResponse } from 'uploadthing/client';
import { z } from 'zod';

export default function EditProjectPage() {
  const blogSlug = useParams().projectSlug;
  const [syncedProject, setSyncedProject] =
    useState<InferSelectModel<typeof schema.projects>>();
  const mode = blogSlug !== 'new' ? 'edit' : 'new';

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  async function fetchProjectBySlug() {
    if (mode === 'edit') {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const project = await getProjectBySlug(blogSlug as string);
        if (!project) {
          router.push('/dashboard/projects');
          toast({ title: 'Project data was not found' });
        } else {
          setSyncedProject(project);
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
    fetchProjectBySlug();
  }, []);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {mode.at(0)?.toUpperCase()}
            {mode.substring(1)} Project
          </h2>
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <ReloadIcon className="animate-spin"></ReloadIcon>
            </div>
          ) : mode === 'new' ? (
            <CreateProject></CreateProject>
          ) : (
            syncedProject && (
              <EditProject
                syncedProject={syncedProject}
                resync={fetchProjectBySlug}
              />
            )
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

const uploadFileResponseSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string().url(),
  url: z.string().url()
});

const ProjectSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title should not exceed 200 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(50, 'Slug should not exceed 50 characters'),
  involvements: z
    .array(z.string().min(1, 'Involvement item cannot be empty'))
    .nonempty('Involvements cannot be empty'),
  targetUrl: z
    .string()
    .url('Invalid URL format')
    .min(1, 'Target URL is required'),
  about: z
    .string()
    .min(1, 'About is required')
    .max(1500, 'About should not exceed 1500 characters'),
  mainThumb: uploadFileResponseSchema.extend({
    type: z.literal('image')
  }),
  samples: z
    .array(
      uploadFileResponseSchema.extend({
        type: z.union([z.literal('image'), z.literal('video')])
      })
    )
    .nonempty('Samples cannot be empty'),
  review: z.object({
    authorName: z
      .string()
      .min(1, 'Author name is required')
      .max(100, 'Author name should not exceed 100 characters'),
    authorImage: uploadFileResponseSchema.extend({
      type: z.union([z.literal('image'), z.literal('video')])
    }),
    authorCompany: z
      .string()
      .min(1, 'Author company is required')
      .max(100, 'Author company should not exceed 100 characters'),
    text: z
      .string()
      .min(1, 'Review text is required')
      .max(1000, 'Review text should not exceed 1000 characters')
  }),
  short_desc: z
    .string()
    .min(1, 'Short description is required')
    .max(200, 'Short description should not exceed 200 characters')
});

type CreateSchemaType = z.infer<typeof ProjectSchema>;

function CreateProject() {
  const form = useForm<CreateSchemaType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: '',
      targetUrl: '',
      slug: '',
      about: '',
      short_desc: '',
      involvements: [],
      samples: [],
      review: {
        authorCompany: '',
        authorImage: undefined,
        authorName: '',
        text: ''
      },
      mainThumb: undefined
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
      await createProjecct({
        ...v,
        involvements: v.involvements.map((v) => v.trim()),
        mainThumb: {
          src: v.mainThumb.url,
          type: v.mainThumb.type
        },
        review: {
          ...v.review,
          authorImage: v.review.authorImage.url
        },
        samples: v.samples.map((v) => ({ src: v.url, type: v.type }))
      });
      toast({ title: 'Project was created!' });
      router.push(`/dashboard/projects/${v.slug}`);
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
          name="mainThumb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Thumbnail</FormLabel>
              <FormDescription>Dimensions: 480x360</FormDescription>
              <FormControl>
                <FileUploadImage
                  onChange={(v) => {
                    if (v.at(0)) {
                      form.setValue('mainThumb', { ...v[0], type: 'image' });
                    }
                  }}
                  value={field.value ? [field.value] : []}
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
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project title"
                    {...field}
                    onChange={(e) => {
                      form.setValue('slug', generateSlug(e.target.value || ''));
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
            name="slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Slug</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter project slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Enter something about project"
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
            name="short_desc"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Enter meta description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="targetUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Target URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter target url"
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
        </div>

        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="involvements"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Involvements</FormLabel>
                <FormDescription>
                  Enter comma-seperated involvements
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter Involvements"
                    {...field}
                    value={(field.value || ['']).join(',')}
                    onChange={(e) => {
                      console.log(e.target.value.split(','));
                      form.setValue(
                        'involvements',
                        e.target.value.split(',') as any
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="samples"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Samples</FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(v) => {
                    if (v.length > 0) {
                      form.setValue('samples', v as any);
                    }
                  }}
                  value={field.value ? field.value : []}
                  onRemove={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-3">
          <Label>Review</Label>
          <FormField
            control={form.control}
            name="review.authorImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Image</FormLabel>
                <FormControl>
                  <FileUploadImage
                    onChange={(v) => {
                      if (v.at(0)) {
                        form.setValue('review.authorImage', {
                          ...v[0],
                          type: 'image'
                        });
                      }
                    }}
                    value={field.value ? [field.value] : []}
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
              name="review.authorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author's name"
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
              name="review.authorCompany"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Author's company</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author's company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="review.text"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Review Text</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Enter author review"
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
        </div>

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

function EditProject({
  syncedProject,
  resync
}: {
  syncedProject: InferSelectModel<typeof schema.projects>;
  resync: () => any;
}) {
  const form = useForm<CreateSchemaType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: syncedProject.title,
      slug: syncedProject.slug,
      involvements: syncedProject.involvements,
      targetUrl: syncedProject.targetUrl,
      about: syncedProject.about,
      mainThumb: syncedProject.mainThumb
        ? {
            fileName: '',
            name: '',
            fileSize: 0,
            size: 0,
            fileKey: '',
            key: '',
            fileUrl: syncedProject.mainThumb.src,
            url: syncedProject.mainThumb.src,
            type: syncedProject.mainThumb.type
          }
        : undefined,
      samples:
        syncedProject.samples.map((s) => ({
          fileName: '',
          name: '',
          fileSize: 0,
          size: 0,
          fileKey: '',
          key: '',
          fileUrl: s.src,
          url: s.src,
          type: s.type
        })) || [],
      review: {
        authorName: syncedProject.review?.authorName || '',
        authorImage: syncedProject.review?.authorImage
          ? {
              fileName: '',
              name: '',
              fileSize: 0,
              size: 0,
              fileKey: '',
              key: '',
              fileUrl: syncedProject.review.authorImage,
              url: syncedProject.review.authorImage,
              type: 'image'
            }
          : undefined,
        authorCompany: syncedProject.review?.authorCompany || '',
        text: syncedProject.review?.text || ''
      },
      short_desc: syncedProject.short_desc
    }
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(v: CreateSchemaType) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      console.log(v);
      await editProject({
        ...v,
        involvements: v.involvements.map((v) => v.trim()),
        mainThumb: {
          src: v.mainThumb.url,
          type: v.mainThumb.type
        },
        review: {
          ...v.review,
          authorImage: v.review.authorImage.url
        },
        samples: v.samples.map((v) => ({ src: v.url, type: v.type })),
        id: syncedProject.id
      });
      toast({ title: 'Project was updated!' });
      resync();
    } catch (err: any) {
      toast({
        title: 'There was an error updating the project',
        description: err.message || 'unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {syncedProject.updated_at && (
          <p className="text-sm">
            Last updated at: {formatDate(new Date(syncedProject.updated_at))} 🎉
          </p>
        )}
        <FormField
          control={form.control}
          name="mainThumb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Thumbnail</FormLabel>
              <FormDescription>Dimensions: 480x360</FormDescription>
              <FormControl>
                <FileUploadImage
                  onChange={(v) => {
                    if (v.at(0)) {
                      form.setValue('mainThumb', { ...v[0], type: 'image' });
                    }
                  }}
                  value={field.value ? [field.value] : []}
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
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project title"
                    {...field}
                    onChange={(e) => {
                      form.setValue('slug', generateSlug(e.target.value || ''));
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
            name="slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project Slug</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter project slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Enter something about project"
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
            name="short_desc"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder="Enter meta description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="targetUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Target URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter target url"
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
        </div>

        <div className="my-3 flex items-center gap-5">
          <FormField
            control={form.control}
            name="involvements"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Involvements</FormLabel>
                <FormDescription>
                  Enter comma-separated involvements
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter Involvements"
                    {...field}
                    value={(field.value || ['']).join(',')}
                    onChange={(e) => {
                      console.log(e.target.value.split(','));
                      form.setValue(
                        'involvements',
                        e.target.value.split(',') as any
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="samples"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Samples</FormLabel>
              <FormControl>
                <FileUpload
                  onChange={(v) => {
                    if (v.length > 0) {
                      form.setValue('samples', v as any);
                    }
                  }}
                  value={field.value ? field.value : []}
                  onRemove={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-3">
          <Label>Review</Label>
          <FormField
            control={form.control}
            name="review.authorImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Image</FormLabel>
                <FormControl>
                  <FileUploadImage
                    onChange={(v) => {
                      if (v.at(0)) {
                        form.setValue('review.authorImage', {
                          ...v[0],
                          type: 'image'
                        });
                      }
                    }}
                    value={field.value ? [field.value] : []}
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
              name="review.authorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author's name"
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
              name="review.authorCompany"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Author's company</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author's company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="review.text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Enter review text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Update Project</span>
        </Button>
      </form>
    </Form>
  );
}

// function EditProject({
//   syncedBlog,
//   resync
// }: {
//   syncedBlog: InferSelectModel<typeof schema.blogs>;
//   resync: () => any;
// }) {
//   const form = useForm<CreateSchemaType>({
//     resolver: zodResolver(CreateFormSchema),
//     defaultValues: {
//       blog_content: syncedBlog.blog_content,
//       blog_content_slate: syncedBlog.blog_content_slate || [
//         {
//           id: '1',
//           type: 'p',
//           children: [{ text: '' }]
//         }
//       ],
//       blog_thumbnail: [
//         {
//           url: syncedBlog.blog_thumbnail,
//           fileUrl: syncedBlog.blog_thumbnail,
//           fileKey: syncedBlog.blog_thumbnail,
//           fileName: syncedBlog.blog_thumbnail,
//           fileSize: 5,
//           key: '1',
//           name: syncedBlog.blog_thumbnail,
//           size: 5
//         }
//       ],
//       blog_slug: syncedBlog.slug,
//       blog_title: syncedBlog.blog_title,
//       image_alt: syncedBlog.metadata?.image_alt,
//       meta_description: syncedBlog.metadata?.meta_description,
//       meta_title: syncedBlog.metadata?.meta_title,
//       target_keywords: syncedBlog.metadata?.target_keyword
//     }
//   });
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   async function handleSubmit(v: CreateSchemaType) {
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       await editBlog(syncedBlog.id, {
//         content_obj: v.blog_content_slate,
//         content: v.blog_content,
//         thumbnail: v.blog_thumbnail.at(0)!.url,
//         title: v.blog_title,
//         metadata: {
//           image_alt: v.image_alt,
//           meta_description: v.meta_description,
//           meta_title: v.meta_title,
//           target_keyword: v.target_keywords
//         }
//       });
//       toast({ title: 'Blog was updated!' });
//       resync();
//     } catch (err: any) {
//       toast({
//         title: 'There was an error updating the blog',
//         description: err.message || 'unknown error'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)}>
//         {syncedBlog.updated_at && (
//           <p className="text-sm">
//             Last updated at: {formatDate(new Date(syncedBlog.updated_at))} 🎉
//           </p>
//         )}
//         <FormField
//           control={form.control}
//           name="blog_thumbnail"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Cover Thumbnail</FormLabel>
//               <FormControl>
//                 <FileUpload
//                   onChange={field.onChange}
//                   value={field.value}
//                   imageLimit={1}
//                   onRemove={field.onChange}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="my-3 flex items-center gap-5">
//           <FormField
//             control={form.control}
//             name="blog_title"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Blog Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter blog title"
//                     {...field}
//                     onChange={(e) => {
//                       form.setValue(
//                         'blog_slug',
//                         generateSlug(e.target.value || '')
//                       );
//                       field.onChange(e);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="blog_slug"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Blog Slug</FormLabel>
//                 <FormControl>
//                   <Input disabled placeholder="Enter blog title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="my-3 flex items-center gap-5">
//           <FormField
//             control={form.control}
//             name="meta_title"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Meta Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter meta title"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="meta_description"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Meta Description</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter meta description" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className="my-3 flex items-center gap-5">
//           <FormField
//             control={form.control}
//             name="image_alt"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Image Alt</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter title image alt"
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                     }}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="target_keywords"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Target Keywords</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter target keyword" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="blog_content_slate"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormLabel>Blog Content</FormLabel>
//               <FormControl>
//                 <PlateEditor
//                   onMarkdownChanged={(v) => form.setValue('blog_content', v)}
//                   editorValue={field.value}
//                   setEditorValue={field.onChange}
//                   initialValue={field.value}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           className="my-4 flex items-center gap-5"
//           disabled={isLoading}
//           type="submit"
//         >
//           Save Blog{' '}
//           {isLoading && <ReloadIcon className="animate-spin"></ReloadIcon>}
//         </Button>
//       </form>
//     </Form>
//   );
// }
