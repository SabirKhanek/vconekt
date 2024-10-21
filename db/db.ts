import { drizzle } from 'drizzle-orm/mysql2'; // Use MySQL specific drizzle import
import mysql from 'mysql2/promise'; // Import MySQL client
import * as schema from './schema';
import { Logger } from 'drizzle-orm';

// Hardcoded database configuration
const DB_CONFIG = {
  host: 'localhost',
  database: 'vconekt',
  user: 'root',
  password: 'root123'
};

export async function getConnection({
  logging = false
}: {
  logging?: boolean;
}) {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);

    const db = drizzle<typeof schema>(connection, {
      logger: logging,
      schema,
      mode: 'default'
    });

    return { db, connection };
  } catch (error) {
    console.error('Failed to create database connection:', error);
    throw error;
  }
}

export async function getPoolConnection({
  logging,
  timeout
}: {
  logging?: boolean | Logger;
  timeout?: number;
}) {
  const pool = mysql.createPool({
    ...DB_CONFIG,
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
