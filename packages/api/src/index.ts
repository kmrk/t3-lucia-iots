import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { FastifyRouter, NextjsRouter } from "./router";
import {
  createFastifyCallerFactory,
  createFastifyContext,
} from "./context/fastify";
import {
  createNextjsCallerFactory,
  createNextjsContext,
} from "./context/nextjs";
import { fastifyRouter, nextjsRouter } from "./router";

const createNextjsCaller = createNextjsCallerFactory(nextjsRouter);
type NextjsRouterInputs = inferRouterInputs<NextjsRouter>;
type NextjsRouterOutputs = inferRouterOutputs<NextjsRouter>;

const createFastifyCaller = createFastifyCallerFactory(fastifyRouter);
type FastifyRouterInputs = inferRouterInputs<FastifyRouter>;
type FastifyRouterOutputs = inferRouterOutputs<FastifyRouter>;

export {
  createFastifyContext,
  fastifyRouter,
  createFastifyCaller,
  createNextjsContext,
  nextjsRouter,
  createNextjsCaller,
};
export type {
  FastifyRouter,
  FastifyRouterInputs,
  FastifyRouterOutputs,
  NextjsRouter,
  NextjsRouterInputs,
  NextjsRouterOutputs,
};
