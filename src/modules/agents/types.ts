import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type Agent = inferRouterOutputs<AppRouter>["agents"]["getOne"];
