import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './index';
import { users } from './schema/index';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const run = async () => {
  await migrate(db, { migrationsFolder: '_migrations' });
  await setup();
  await connection.end();
};

const init = async () => {
  const admin = await db.select().from(users).where(eq(users.id, '0'));

  if (admin.length > 0) return;
  await db.insert(users).values({ id: '0', name: "superadmin", phone: "18888888888", role: "admin", password: bcrypt.hashSync("111111", 10) });
};

const setup = async () => {
  await init();
};

run();
