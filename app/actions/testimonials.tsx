'use server';

import { schema } from '@/db';
import { db } from '@/shared/mysql';
import { eq, InferInsertModel } from 'drizzle-orm';

export async function getTestimonials() {
  return await db.select().from(schema.testimonials);
}

export async function createTestimonial(
  testimonial: InferInsertModel<typeof schema.testimonials>
) {
  const testimonialCreated = await db
    .insert(schema.testimonials)
    .values({ ...testimonial });
  return true;
}

export async function deleteTestimonial(testimonial_id: number) {
  await db
    .delete(schema.testimonials)
    .where(eq(schema.testimonials.id, testimonial_id));
  return true;
}
