'use server';
import { schema } from '@/db';
import { db } from '@/shared/mysql';
import { Value } from '@udecode/plate-common';
import { eq, InferInsertModel } from 'drizzle-orm';

export async function getBlogs() {
  return (await db.select().from(schema.blogs)).map((v) => {
    const { blog_content, blog_content_slate, ...blog } = v;
    return blog;
  });
}

export async function createBlog(blog: InferInsertModel<typeof schema.blogs>) {
  const res = await db.insert(schema.blogs).values(blog);
  return true;
}

export async function editBlog(
  id: number,
  obj: {
    title?: string;
    slug?: string;
    thumbnail?: string;
    content?: string;
    content_obj: Value;
    metadata: InferInsertModel<typeof schema.blogs>['metadata'];
  }
) {
  const res = await db
    .update(schema.blogs)
    .set({
      blog_title: obj.title,
      blog_content: obj.content,
      blog_thumbnail: obj.thumbnail,
      blog_content_slate: obj.content_obj,
      slug: obj.slug,
      metadata: obj.metadata
    })
    .where(eq(schema.blogs.id, id));
  return true;
}

export async function getBlogBySlug(slug: string) {
  const blog = await db
    .select()
    .from(schema.blogs)
    .where(eq(schema.blogs.slug, slug));
  return blog.at(0);
}

export async function deleteBlog(id: number) {
  const res = await db.delete(schema.blogs).where(eq(schema.blogs.id, id));
  return true;
}
