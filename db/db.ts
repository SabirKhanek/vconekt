import path from 'path';
import { drizzle } from 'drizzle-orm/mysql2'; // Use MySQL specific drizzle import
import mysql from 'mysql2/promise'; // Import MySQL client
import * as schema from './schema';
import { Logger } from 'drizzle-orm';
import { config } from 'dotenv';
config();

// config({ path: path.join(__dirname, "..", "..", "..", ".env") });
let { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

export async function getConnection({
  logging = false
}: {
  logging?: boolean;
}) {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST!,
    database: MYSQL_DATABASE!,
    user: MYSQL_USER!,
    password: MYSQL_PASSWORD!
  });

  const db = drizzle<typeof schema>(connection, {
    logger: logging,
    schema,
    mode: 'default'
  });

  return { db, connection };
}

export async function getPoolConnection({
  logging,
  timeout
}: {
  logging?: boolean | Logger;
  timeout?: number;
}) {
  const pool = mysql.createPool({
    host: MYSQL_HOST!,
    database: MYSQL_DATABASE!,
    user: MYSQL_USER!,
    password: MYSQL_PASSWORD!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  const connection = await pool.getConnection();
  const db = drizzle<typeof schema>(connection, {
    schema,
    logger: logging,
    mode: 'default'
  });
  return { db, connection };
}
