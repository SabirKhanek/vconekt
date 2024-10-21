import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'vconekt',
    multipleStatements: true
  });

  const db = drizzle(connection);

  console.log('Starting migration...');

  try {
    await migrate(db, {
      migrationsFolder: path.join(__dirname, '..', 'migrations')
    });
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error('Unhandled error during migration:', error);
  process.exit(1);
});
