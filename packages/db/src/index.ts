import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/index";

export const connection = postgres(
  `${"postgresql://jd_auto:jd_auto@localhost:5432/jd_auto"}`,
); //;?sslmode=require`);
export const db = drizzle(connection, { schema });

// 为了简便使用，没使用alias
export * from "./schema/index";

export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";
