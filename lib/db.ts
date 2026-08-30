import { neon } from '@neondatabase/serverless';


export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in your environment (.env or .env.local).');
  }
  return neon(databaseUrl);
}

export const sql = ((strings: TemplateStringsArray, ...values: any[]) => {
  const db = getDb();
  return (db as any)(strings, ...values);
}) as ReturnType<typeof neon>;
