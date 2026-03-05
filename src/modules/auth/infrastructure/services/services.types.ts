import type { auth } from "@/lib/auth/auth";

type BetterAuthSession = typeof auth.$Infer.Session;
type BetterAuthUser = BetterAuthSession["user"];

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;
type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

export type {
  BetterAuthSession,
  BetterAuthUser,
  SignInEmailResponse,
  SignUpEmailResponse,
};
