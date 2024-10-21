'use client';
import { deleteBlog, getBlogs } from '@/app/actions/blogs';
import {
  //addDefaultProjects,
  deleteProject,
  getProjects
} from '@/app/actions/projects';
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

type Project = InferSelectModel<typeof schema.projects>;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const fetchProjects = async () => {
    try {
      const _projects = await getProjects();
      setProjects(_projects);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((blog) => blog.id !== id));
      toast({ title: 'Blog Deleted!' });
    } catch (err) {
      toast({ title: 'Failed to delete blog!' });
    }
  };

  function handleOnCreate() {
    fetchProjects();
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <div className="flex items-center gap-2">
            {/* <Button
              onClick={() =>
                addDefaultProjects()
                  .then(() => {
                    toast({ title: 'Defaults were imported' });
                    fetchProjects();
                  })
                  .catch(() => {
                    toast({
                      title: 'Defaults failed to import',
                      variant: 'destructive'
                    });
                  })
              }
              variant="outline"
            >
              Add default projects
            </Button> */}
            <Button variant="outline">
              <Link href={'/dashboard/projects/new'}>Create New Project</Link>
            </Button>
          </div>
        </div>
        <div className="my-5">
          <Table>
            <TableCaption>Projects</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">ID</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Target</TableHead>
                <TableHead className="w-96">Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((t, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">{t.id}</TableCell>
                  <TableCell>
                    {t.mainThumb && (
                      <div className="relative h-16 w-24">
                        <Image
                          fill
                          src={t.mainThumb.src}
                          className="object-cover object-center"
                          alt="cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/projects/${t.slug}`}>{t.title}</Link>
                  </TableCell>
                  <TableCell>{t.slug}</TableCell>
                  <TableCell>
                    <Link className="hover:underline" href={t.targetUrl}>
                      View Target
                    </Link>
                  </TableCell>
                  <TableCell className="">
                    {t.created_at && formatDate(new Date(t.created_at))}
                  </TableCell>
                  <TableCell className=" flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/projects/${t.slug}`}>Edit</Link>
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
