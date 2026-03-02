import "server-only";

import { auth } from "@/lib/auth/auth";
import { BetterAuthUser } from "./types";
import {
  SignInFailedError,
  SignOutFailedError,
  SignUpFailedError,
} from "@/modules/auth/domain";
import {
  AuthRepository,
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
  AuthenticationResultDTO,
} from "@/modules/auth/application";

type SignUpEmailResponse = Awaited<ReturnType<typeof auth.api.signUpEmail>>;
type SignInEmailResponse = Awaited<ReturnType<typeof auth.api.signInEmail>>;

class BetterAuthRepository implements AuthRepository {
  private static mapUser(user: BetterAuthUser) {
    return { userId: user.id, email: user.email };
  }

  private static mapAuthResponseToResult(result: {
    token: string | null;
    user: BetterAuthUser;
  }): AuthenticationResultDTO {
    const base = BetterAuthRepository.mapUser(result.user);
    return result.token === null
      ? { status: "PENDING_VERIFICATION", ...base }
      : { status: "SIGNED_IN", ...base };
  }

  async signUpWithEmail(input: SignUpEmailInputDTO): Promise<SignUpResultDTO> {
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

  async signInWithEmail(input: SignInEmailInputDTO): Promise<SignInResultDTO> {
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

export { BetterAuthRepository };
