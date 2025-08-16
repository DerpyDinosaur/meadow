import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import env from '../env';

const sqlite = new Database(env.DB_FILE_NAME);
export const db = drizzle(sqlite, { schema });