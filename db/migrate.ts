import { migrate } from 'drizzle-orm/mysql2/migrator';
import { getConnection } from './db';
import path from 'path';
import { schema } from '.';
// import { sql } from "drizzle-orm";
async function main() {
  const { db, connection } = await getConnection({ logging: true });
  const dirPath = path.join(__dirname, '..', 'migrations');
  // await db.execute(sql`select 1`);
  await migrate<typeof schema>(db, { migrationsFolder: dirPath });
  await connection.end();
}
// console.log(process.env.DB_STRING);
main();
