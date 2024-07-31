'use server';

import { schema } from '@/db';
import { db, initConnection } from '@/shared/mysql';
import { eq, InferInsertModel } from 'drizzle-orm';
import { projects } from '@/shared/consts/projects';

export async function getProjects() {
  const db = await initConnection();

  return await db.select().from(schema.projects);
}

export async function createProjecct(
  project: InferInsertModel<typeof schema.projects>
) {
  const db = await initConnection();

  const testimonialCreated = await db
    .insert(schema.projects)
    .values({ ...project });
  return true;
}

export async function deleteProject(project_id: number) {
  const db = await initConnection();

  await db.delete(schema.projects).where(eq(schema.projects.id, project_id));
  return true;
}

export async function getProjectBySlug(slug: string) {
  const db = await initConnection();
  const projects = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.slug, slug));
  return projects.at(0);
}

export async function editProject(
  project: Partial<InferInsertModel<typeof schema.projects>> & { id: number }
) {
  const db = await initConnection();

  await db
    .update(schema.projects)
    .set({ ...project })
    .where(eq(schema.projects.id, project.id));

  return true;
}
export async function addDefaultProjects() {
  const db = await initConnection();

  const existingProjects = await db
    .select({ slug: schema.projects.slug })
    .from(schema.projects);
  const existingSlugs = new Set(
    existingProjects.map((project) => project.slug)
  );

  const newProjects = projects.filter(
    (project) => !existingSlugs.has(project.slug)
  );

  if (newProjects.length > 0) {
    await db.insert(schema.projects).values(newProjects);
  }

  return true;
}
