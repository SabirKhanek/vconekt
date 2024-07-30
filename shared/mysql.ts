import { getConnection } from '@/db';
import { sql } from 'drizzle-orm';
import { Connection } from 'mysql2';

export let db: Awaited<ReturnType<typeof getConnection>>['db'];
export async function initConnection() {
  if (!db) {
    const connection = await getConnection({ logging: true });
    db = connection.db;
  }
  try {
    await db.execute(sql`SELECT 1;`);
  } catch (err) {
    db = (await getConnection({ logging: true })).db;
  }
  return db;
}
initConnection();
