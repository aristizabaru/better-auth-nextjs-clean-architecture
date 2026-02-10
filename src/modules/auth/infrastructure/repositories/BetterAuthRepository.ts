import "server-only";

import { auth } from "@/lib/auth/auth";
import { SignUpFailedError } from "../../domain/errors/SignUpFailedError";
import type { AuthRepository } from "../../application/ports/AuthRepository";
import type { BetterAuthUser } from "../types/better-auth.types";
import type { SignUpResult } from "../../application/dtos/SignUpResult";
import type { SignUpEmailInput } from "../../application/dtos/SignUpEmailInput";

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;

function map(user: BetterAuthUser): Pick<SignUpResult, "userId" | "email"> {
  return { userId: user.id, email: user.email };
}

export class BetterAuthRepository implements AuthRepository {
  async signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult> {
    let result: SignUpEmailResponse;

    try {
      result = await auth.api.signUpEmail({ body: input });
    } catch {
      throw new SignUpFailedError();
    }

    const base = map(result.user);
    const hasSession = result.token !== null;

    // token string -> quedó autenticado
    // token null   -> se creó usuario pero no sesión (típico si hay verificación requerida)
    if (!hasSession) {
      return { status: "PENDING_VERIFICATION", ...base };
    }

    return { status: "SIGNED_IN", ...base };
  }
}
