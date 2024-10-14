import { authRouter } from "./router/auth";
import { projectsRouter } from "./router/projects";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
