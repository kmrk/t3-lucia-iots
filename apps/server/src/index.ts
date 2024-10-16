import cors from "@fastify/cors";
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import type { FastifyRouter } from "@acme/api";
import { createFastifyContext, fastifyRouter } from "@acme/api";

const server = fastify({
  maxParamLength: 5000,
});

server.register(cors, {
  credentials: true,
  origin: "http://localhost:4321",
  methods: ["GET", "POST", "OPTIONS"],
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: fastifyRouter,
    createContext: createFastifyContext,
    onError({ path, error }: any) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<FastifyRouter>["trpcOptions"],
});

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
