import "server-only";

import { auth } from "@/lib/auth/auth";
import { SignUpFailedError } from "../../domain/errors/SignUpFailedError";
import { SignInFailedError } from "../../domain/errors/SignInFailedError";
import type { AuthRepository } from "../../application/ports/AuthRepository";
import type { BetterAuthUser } from "../types/better-auth.types";
import type { SignUpEmailInput } from "../../application/dtos/SignUpEmailInput";
import type { SignInEmailInput } from "../../application/dtos/SignInEmailInput";
import type {
  AuthFlowResult,
  SignInResult,
  SignUpResult,
} from "../../application/dtos/AuthFlowResult";
import { SignOutFailedError } from "../../domain/errors/SignOutFailedError";

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;
type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

export class BetterAuthRepository implements AuthRepository {
  private static mapUser(user: BetterAuthUser) {
    return { userId: user.id, email: user.email };
  }

  private static mapAuthResponseToResult(result: {
    token: string | null;
    user: BetterAuthUser;
  }): AuthFlowResult {
    const base = BetterAuthRepository.mapUser(result.user);
    return result.token === null
      ? { status: "PENDING_VERIFICATION", ...base }
      : { status: "SIGNED_IN", ...base };
  }

  async signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult> {
    let result: SignUpEmailResponse;

    try {
      result = await auth.api.signUpEmail({ body: input });
    } catch {
      throw new SignUpFailedError();
    }

    return BetterAuthRepository.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signInWithEmail(input: SignInEmailInput): Promise<SignInResult> {
    let result: SignInEmailResponse;

    try {
      result = await auth.api.signInEmail({ body: input });
    } catch {
      throw new SignInFailedError();
    }

    return BetterAuthRepository.mapAuthResponseToResult({
      token: result.token,
      user: result.user,
    });
  }

  async signOut(request: { headers: Headers }): Promise<void> {
    try {
      await auth.api.signOut({ headers: request.headers });
    } catch {
      throw new SignOutFailedError();
    }
  }
}
