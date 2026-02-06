import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { envServer } from "@/shared/config/env/env.server";
import prisma from "../prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql","sqlite" "postgresql", ...etc
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min - cache cookie to prevent redundant database calls
    },
  },
  plugins: [nextCookies()],
  trustedOrigins: [envServer.BETTER_AUTH_TRUSTED_ORIGINS],
  emailAndPassword: {
    enabled: true,
  },
});
