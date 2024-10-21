import { migrate } from 'drizzle-orm/mysql2/migrator';
import { getConnection } from './db';
import path from 'path';
import { schema } from '.';

async function main() {
  try {
    console.log('Starting migration process...');
    const { db, connection } = await getConnection({ logging: true });
    const dirPath = path.join(__dirname, '..', 'migrations');

    console.log(`Migration folder: ${dirPath}`);
    console.log('Executing migrations...');

    const results = await migrate<typeof schema>(db, {
      migrationsFolder: dirPath
    });

    // console.log(`Executed ${results.length} migrations`);
    // results.forEach((migration) => {
    //   console.log(`- ${migration.migrationName}`);
    // });

    await connection.end();
    console.log('Migration process completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
