import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import type { NextjsRouter } from "@acme/api";
import { createNextjsCaller, createNextjsContext } from "@acme/api";

import { validateRequest } from "~/lib/auth/validate-request";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  const data = await validateRequest();
  return createNextjsContext({
    session: data.session,
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createNextjsCaller(createContext);
////
////
////
//// 这里等待 createContext 的异步结果
//const caller = async () => {
//  const context = await createContext(); // 确保等待异步 createContext 的结果
//  return createNextjsCaller(context); // 使用同步上下文调用 createNextjsCaller
//};

export const { trpc: api, HydrateClient } =
  createHydrationHelpers<NextjsRouter>(caller, getQueryClient);

export { caller, getQueryClient };
