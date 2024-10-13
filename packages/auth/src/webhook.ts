import crypto from "crypto";
import { UserWebhookEvent, WebhookEvent } from "@clerk/nextjs/server";

import { eq } from "@acme/db";
import { db } from "@acme/db/client";
import {
  ClerkUsers,
  EmailAddresses,
  SelectClerkUser,
  SelectEmailAddress,
} from "@acme/db/schema";

const userCreatedDefaultHandler = async (evt: UserWebhookEvent) => {
  if (evt.type !== "user.created") throw new Error("Invalid event type");

  const [clerkUser] = await db
    .insert(ClerkUsers)
    .values({
      id: evt.data.id,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
      imageUrl: evt.data.image_url,
      twoFactorEnabled: evt.data.two_factor_enabled,
      primaryEmailId: evt.data.primary_email_address_id,
      createdAt: new Date(evt.data.created_at),
      updatedAt: new Date(evt.data.updated_at),
    })
    .returning();

  const emails = await db
    .insert(EmailAddresses)
    .values(
      evt.data.email_addresses.map((email) => ({
        id: email.id,
        emailAddress: email.email_address,
        verifyStatus: email.verification?.status,
        userId: evt.data.id,
      })),
    )
    .returning();

  return { clerkUser, emails };
};

const userDeletedDefaultHandler = async (evt: UserWebhookEvent) => {
  if (evt.type !== "user.deleted") throw new Error("Invalid event type");

  if (evt.data.id) {
    // Emails are deleted automatically due to cascading deletes
    await db.delete(ClerkUsers).where(eq(ClerkUsers.id, evt.data.id));
  }
};

const userUpdatedDefaultHandler = async (evt: UserWebhookEvent) => {
  if (evt.type !== "user.updated") throw new Error("Invalid event type");

  const [clerkUser] = await db
    .update(ClerkUsers)
    .set({
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
      imageUrl: evt.data.image_url,
      twoFactorEnabled: evt.data.two_factor_enabled,
      primaryEmailId: evt.data.primary_email_address_id,
      updatedAt: new Date(evt.data.updated_at),
    })
    .where(eq(ClerkUsers.id, evt.data.id))
    .returning();

  const emailsClerk = evt.data.email_addresses.map((email) => email.id);
  const emailsDb = await db
    .select()
    .from(EmailAddresses)
    .where(eq(EmailAddresses.userId, evt.data.id));

  // This will delete all emails that are not in the Clerk event
  for (const email of emailsDb) {
    if (!emailsClerk.includes(email.id)) {
      await db.delete(EmailAddresses).where(eq(EmailAddresses.id, email.id));
    }
  }

  // This will insert or update all emails in the Clerk event
  let moreEmails: SelectEmailAddress[] = [];
  for (const email of evt.data.email_addresses) {
    const [emailDb] = await db
      .insert(EmailAddresses)
      .values({
        id: email.id,
        emailAddress: email.email_address,
        verifyStatus: email.verification?.status,
        userId: evt.data.id,
      })
      .onConflictDoUpdate({
        target: EmailAddresses.id,
        set: {
          emailAddress: email.email_address,
          verifyStatus: email.verification?.status,
          userId: evt.data.id,
        },
      })
      .returning();

    if (emailDb) {
      moreEmails.push(emailDb);
    }
  }

  return {
    clerkUser,
    emails: [...emailsDb, ...moreEmails].filter((email) =>
      emailsClerk.includes(email.id),
    ),
  };
};

interface WebhookHandlerOptions {
  siginingSecret: string;
  useDefaultHandlers?: boolean;
  userCreatedHandler?: (
    evt: UserWebhookEvent,
    clerkUser?: SelectClerkUser,
    emails?: SelectEmailAddress[],
  ) => Promise<void>;
  userDeletedHandler?: (evt: UserWebhookEvent) => Promise<void>;
  userUpdatedHandler?: (
    evt: UserWebhookEvent,
    clerkUser?: SelectClerkUser,
    emails?: SelectEmailAddress[],
  ) => Promise<void>;
}

export const createWebhookHandler = (opts: WebhookHandlerOptions) => {
  // Defaults:
  if (opts.useDefaultHandlers === undefined) opts.useDefaultHandlers = true;

  return async (req: Request): Promise<Response> => {
    const { data: evt, valid } = await verifyRequest<WebhookEvent>(
      req,
      opts.siginingSecret,
    );

    if (!valid) {
      // Return a 404, since this is a public webhook and
      // we want to pretend that it doesn't exist if it's not valid
      return new Response(null, { status: 404 });
    }

    switch (evt.type) {
      case "user.created": {
        if (opts.useDefaultHandlers) {
          const { clerkUser, emails } = await userCreatedDefaultHandler(evt);
          if (opts.userCreatedHandler)
            await opts.userCreatedHandler(evt, clerkUser, emails);
        }
        break;
      }

      case "user.deleted": {
        if (opts.useDefaultHandlers) await userDeletedDefaultHandler(evt);
        if (opts.userDeletedHandler) await opts.userDeletedHandler(evt);
        break;
      }

      case "user.updated": {
        if (opts.useDefaultHandlers) {
          const { clerkUser, emails } = await userUpdatedDefaultHandler(evt);
          if (opts.userUpdatedHandler)
            await opts.userUpdatedHandler(evt, clerkUser, emails);
        }
        break;
      }
    }

    return new Response(null, { status: 204 });
  };
};

export default async function verifyRequest<T = unknown>(
  req: Request,
  secret: string,
) {
  secret = secret.replace("whsec_", "");
  const svixId = req.headers.get("svix-id") ?? req.headers.get("webhook-id");
  const svixTimestamp =
    req.headers.get("svix-timestamp") ?? req.headers.get("webhook-timestamp");
  const svixSignature =
    req.headers.get("svix-signature") ?? req.headers.get("webhook-signature");

  if (!svixId || !svixTimestamp || !svixSignature || !req.body) {
    return { valid: false, data: null } as const;
  }

  const rawBody = await req.text();

  const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
  const secretBytes = Buffer.from(secret, "base64");

  const signature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  const signatures = svixSignature.split(" ");
  for (const sig of signatures) {
    const [_, sigValue] = sig.split(",");
    if (signature === sigValue) {
      return { valid: true, data: JSON.parse(rawBody) as T } as const;
    }
  }

  return { valid: false, data: null } as const;
}
