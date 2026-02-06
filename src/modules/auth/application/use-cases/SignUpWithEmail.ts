import type { SignUpEmailInput } from "../dtos/SignUpEmailInput";
import type { SignUpResult } from "../dtos/SignUpResult";
import type { AuthRepository } from "../ports/AuthRepository";

export class SignUpWithEmail {
  constructor(private readonly authRepo: AuthRepository) {}

  async execute(input: SignUpEmailInput): Promise<SignUpResult> {
    // Aquí vivirían reglas de negocio futuras:
    // - no permitir emails de ciertos dominios
    // - normalizar name
    // - etc.

    return this.authRepo.signUpWithEmail(input);
  }
}
