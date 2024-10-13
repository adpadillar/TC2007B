import { createWebhookHandler } from "@acme/auth/webhook";

import { env } from "~/env";

export const runtime = "nodejs";

const handler = createWebhookHandler({
  siginingSecret: env.CLERK_WEBHOOK_SECRET,
  useDefaultHandlers: true,
});

export { handler as POST };
