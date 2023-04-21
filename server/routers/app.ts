// src/server/router/index.ts
import { createRouter } from "@ps/server/context";
import superjson from "superjson";

export const appRouter = createRouter().transformer(superjson);
// export type definition of API
export type AppRouter = typeof appRouter;
