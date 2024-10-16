import { createFastifyRouter } from "../context/fastify";
import { createNextjsRouter } from "../context/nextjs";
import { authRouter } from "./auth";
import { postRouter } from "./post";

export const nextjsRouter = createNextjsRouter({
  auth: authRouter,
  post: postRouter,
});

// export type definition of API
export type NextjsRouter = typeof nextjsRouter;

export const fastifyRouter = createFastifyRouter({
  auth: authRouter,
  post: postRouter,
});

// export type definition of API
export type FastifyRouter = typeof fastifyRouter;
