import type { SignInResult } from "../dtos/AuthFlowResult";
import type { SignInEmailInput } from "../dtos/SignInEmailInput";
import type { AuthRepository } from "../ports/AuthRepository";

export class SignInWithEmail {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(input: SignInEmailInput): Promise<SignInResult> {
    // Aquí vivirían reglas de negocio futuras:

    return this.authRepo.signInWithEmail(input);
  }
}
