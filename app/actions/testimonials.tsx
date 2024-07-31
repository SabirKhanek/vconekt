'use server';

import { schema } from '@/db';
import { db, initConnection } from '@/shared/mysql';
import { eq, InferInsertModel } from 'drizzle-orm';

export async function getTestimonials() {
  const db = await initConnection();

  return await db.select().from(schema.testimonials);
}

export async function createTestimonial(
  testimonial: InferInsertModel<typeof schema.testimonials>
) {
  const db = await initConnection();

  const testimonialCreated = await db
    .insert(schema.testimonials)
    .values({ ...testimonial });
  return true;
}

export async function deleteTestimonial(testimonial_id: number) {
  const db = await initConnection();

  await db
    .delete(schema.testimonials)
    .where(eq(schema.testimonials.id, testimonial_id));
  return true;
}
