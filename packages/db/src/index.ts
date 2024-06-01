import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

export const connection = postgres(`${'postgresql://acmedb:acmedb@database:5432/acmedb'}`); //;?sslmode=require`);
export const db = drizzle(connection, { schema });

// 为了简便使用，没使用alias
export * from './schema/index'; 

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core"; 