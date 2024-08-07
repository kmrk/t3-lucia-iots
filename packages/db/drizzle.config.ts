import type { Config } from "drizzle-kit";

// if (!process.env.POSTGRES_URL) {
//   throw new Error("Missing POSTGRES_URL");
// }

//FIXME replace with correct
const nonPoolingUrl ="postgresql://acme:acme@localhost:5432/acme";// process.env.POSTGRES_URL.replace(":6543", ":5432");



export default {
  out:"_migrations",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  // tablesFilter: ["t3turbo_*"],
} satisfies Config;
