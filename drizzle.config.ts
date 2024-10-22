import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

let { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

let mysqlUrl = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DATABASE}`;

export default {
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    user: MYSQL_USER,
    url: mysqlUrl
  },
  verbose: true,
  strict: true
} satisfies Config;
