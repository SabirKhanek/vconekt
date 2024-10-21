import { drizzle } from 'drizzle-orm/mysql2'; // Use MySQL specific drizzle import
import mysql from 'mysql2/promise'; // Import MySQL client
import * as schema from './schema';
import { Logger } from 'drizzle-orm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a type for the database configuration
type DbConfig = {
  host: string | undefined;
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
};

// Database configuration using environment variables
const DB_CONFIG: DbConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

// Function to validate database configuration
function validateDbConfig(
  config: DbConfig
): asserts config is Required<DbConfig> {
  const requiredKeys: (keyof DbConfig)[] = [
    'host',
    'database',
    'user',
    'password'
  ];
  const missingKeys = requiredKeys.filter((key) => !config[key]);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required database configuration: ${missingKeys.join(', ')}`
    );
  }
}

export async function getConnection({
  logging = false
}: {
  logging?: boolean;
}) {
  try {
    validateDbConfig(DB_CONFIG);
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
