import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import * as t from "io-ts";

import { desc, eq } from "@acme/db";
// import { CreatePostSchema, Post } from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";
import { ioParser } from "../io-ts-helper";
import { UserCodec } from "../../../data/src/user";

export const postRouter = {
  all: publicProcedure.query(
    () => [1, 2, 3, 4, 5, 6, 7, "a"]
  ),
  
  hello: publicProcedure
    .input(
      ioParser(
       UserCodec //io-ts data codec far more flexible than zod
      )
    )
    .query(({ input: {phone,password} }) => {
      return {
        greeting: `Hello ${phone} ${password}`,
      };
    }),

  list: protectedProcedure.query(
    ()=>["Hello this data is protected"]
  ),

  // byId: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(({ ctx, input }) => {
  //     // return ctx.db
  //     //   .select()
  //     //   .from(schema.post)
  //     //   .where(eq(schema.post.id, input.id));

  //     return ctx.db.query.Post.findFirst({
  //       where: eq(Post.id, input.id),
  //     });
  //   }),

  // create: protectedProcedure
  //   .input(CreatePostSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(Post).values(input);
  //   }),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(Post).where(eq(Post.id, input));
  // }),
} satisfies TRPCRouterRecord;
