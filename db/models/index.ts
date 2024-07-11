import { Value } from '@udecode/plate-common';
import {
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core';

export const testimonials = mysqlTable('testimonials', {
  id: int('id').primaryKey().autoincrement(),
  author_name: text('author_name').notNull(),
  author_title: text('author_title').notNull(),
  review: text('review').notNull(),
  cover_thumbnail: text('cover_thumbnail')
});

export const uploads = mysqlTable('uploads', {
  id: int('id').primaryKey().autoincrement(),
  key: text('key'),
  created_at: timestamp('timestamp').defaultNow()
});

export const blogs = mysqlTable('blogs', {
  id: int('id').primaryKey().autoincrement(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  created_at: timestamp('created_at').defaultNow(),
  blog_title: text('blog_title').notNull(),
  blog_content: text('blog_content').notNull(),
  blog_thumbnail: text('blog_thumbnail').notNull(),
  blog_content_slate: json('blog_content_slate').$type<Value>().default([]),
  updated_at: timestamp('updated_at', {
    mode: 'date'
  }).$onUpdate(() => new Date())
});