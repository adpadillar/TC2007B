import type { NextFetchEvent, NextRequest } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@acme/auth/nextjs";

const isProtectedRoute = createRouteMatcher(["/(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  req.headers.set("x-url", req.url);

  const clerk = clerkMiddleware((auth, req) => {
    if (isApiRoute(req)) {
      // Don't redirect for API routes, allow all requests
      return;
    }

    if (!auth().userId && isProtectedRoute(req)) {
      return auth().redirectToSignIn();
    }
  });

  return clerk(req, ev);
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
