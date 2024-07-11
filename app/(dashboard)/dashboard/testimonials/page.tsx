'use client';
import { useEffect, useState } from 'react';
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials
} from '@/app/actions/testimonials';
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
import Image from 'next/image';
import { InferSelectModel } from 'drizzle-orm';
import { schema } from '@/db';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { AlertDialogContent } from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FileUpload from '@/components/file-upload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ImgSchema } from '@/shared/utils';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<
    InferSelectModel<typeof schema.testimonials>[]
  >([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== id)
      );
      toast({ title: 'Testimonial Deleted!' });
    } catch (err) {
      toast({ title: 'Failed to delete testimonial!' });
    }
  };

  function handleOnCreate() {
    fetchTestimonials();
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <CreateTestimonial
            open={open}
            setOpen={setOpen}
            onCreate={handleOnCreate}
          />
        </div>
        <div className="my-5">
          <Table>
            <TableCaption>Testimonials</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">ID</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Author Title</TableHead>
                <TableHead className="w-96">Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">{t.id}</TableCell>
                  <TableCell>
                    {t.cover_thumbnail && (
                      <div className="relative h-16 w-24">
                        <Image
                          fill
                          src={t.cover_thumbnail}
                          className="object-cover object-center"
                          alt="cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{t.author_name}</TableCell>
                  <TableCell>{t.author_title}</TableCell>
                  <TableCell className="w-96 overflow-ellipsis">
                    {t.review.substring(0, 50)}
                    {t.review.length > 50 && '...'}
                  </TableCell>
                  <TableCell>
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



const FormSchema = z.object({
  author_name: z.string().min(1, 'Author name is required'),
  author_review: z.string().min(1, 'Author review is required'),
  author_title: z.string().min(1, 'Author title is required'),
  cover_thumbnail: z
    .array(ImgSchema)
    .max(1, 'You can only add 1 thumbnail')
    .min(1, 'You must add cover thumbnail!')
});

type FormSchemaType = z.infer<typeof FormSchema>;

function CreateTestimonial({
  onCreate,
  open,
  setOpen
}: {
  onCreate: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [loading, setIsLoading] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      author_name: '',
      author_title: '',
      author_review: '',
      cover_thumbnail: []
    }
  });
  const { toast } = useToast();

  async function handleSubmit(v: FormSchemaType) {
    if (loading) return;
    setIsLoading(true);
    try {
      const res = await createTestimonial({
        author_name: v.author_name,
        author_title: v.author_title,
        review: v.author_review,
        cover_thumbnail: v.cover_thumbnail.at(0)?.url
      });

      if (onCreate) onCreate();
      toast({ title: 'Testimonial Created' });
      setOpen(false);
    } catch (err) {
      toast({ title: 'Testimonal creation failed!' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Testimonial</Button>
      </DialogTrigger>
      <DialogContent className="w-[512px]">
        <DialogHeader>
          <DialogTitle>Create Testimonial</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="cover_thumbnail"
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
            <div className="my-4 grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Author's Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Author's Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="author_review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              className="mt-4 flex items-center gap-4"
              type="submit"
            >
              Save Testimonial{' '}
              {loading && <ReloadIcon className="h-5 w-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
