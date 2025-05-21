import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db/db";
import { SendEmail } from "@/app/actions/auth";

export const auth = betterAuth({
  user: {
    additionalFields: {
      is_admin: {
        type: "boolean",
      },
    },
  },
  emailAndPassword: {
    sendResetPassword: async ({ user, url, token }, request) => {
      await SendEmail(user.email, user.name, url);
    },
    enabled: true,
  },

  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
