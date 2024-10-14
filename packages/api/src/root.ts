import { authRouter } from "./router/auth";
import { formsRouter } from "./router/forms";
import { projectsRouter } from "./router/projects";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  auth: authRouter,
  forms: formsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
