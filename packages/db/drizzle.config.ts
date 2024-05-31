import type { Config } from "drizzle-kit";

// if (!process.env.POSTGRES_URL) {
//   throw new Error("Missing POSTGRES_URL");
// }

const nonPoolingUrl ="postgresql://acmedb:acmedb@database:5432/acmedb";// process.env.POSTGRES_URL.replace(":6543", ":5432");



export default {
  out:"_migrations",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  // tablesFilter: ["t3turbo_*"],
} satisfies Config;
