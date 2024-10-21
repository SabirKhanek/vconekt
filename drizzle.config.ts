/**
 * Drizzle configuration for the application.
 * This file sets up the database connection and other Drizzle-related settings.
 */
import type { Config } from 'drizzle-kit';

const DB_CONFIG = {
  host: 'localhost',
  database: 'vconekt',
  user: 'root',
  password: 'root123'
};

export default {
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    ...DB_CONFIG,
    url: `mysql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}/${DB_CONFIG.database}`
  },
  verbose: true,
  strict: true
} satisfies Config;
