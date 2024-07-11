import { getConnection } from '@/db';

export let db: Awaited<ReturnType<typeof getConnection>>['db'];

export async function initConnection() {
  if (!db) {
    db = (await getConnection({ logging: true })).db;
  }
  return db;
}

initConnection();
