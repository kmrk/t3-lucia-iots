import { initTRPC, TRPCError } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import superjson from "superjson";
import { ZodError } from "zod";

import type { Session, User } from "@acme/auth";
import { db } from "@acme/db";

export function createFastifyContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? "anonymous" };
  return { req, res, user };
}

const t = initTRPC.context<typeof createFastifyContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createFastifyCallerFactory = t.createCallerFactory;
export const createFastifyRouter = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  return next({
    ctx: {},
  });
});

export type FastifyContext = Awaited<ReturnType<typeof createFastifyContext>>;
