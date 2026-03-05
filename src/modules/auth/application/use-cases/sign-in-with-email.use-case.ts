import { Email } from "@/modules/auth/domain";
import type { SignInEmailInputDTO, SignInResultDTO } from "../dtos";
import type { AuthService } from "../ports";

/**
 * SignInWithEmailUseCase:
 * Orquesta el inicio de sesión con email (reglas del proceso).
 *
 * Delegación:
 * - Validación semántica del email: Value Object Email (Domain).
 * - Autenticación externa: AuthService (Port).
 */
class SignInWithEmailUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(input: SignInEmailInputDTO): Promise<SignInResultDTO> {
    const email = new Email(input.email);

    return this.authService.signInWithEmail({
      email: email.value,
      password: input.password,
    });
  }
}

export { SignInWithEmailUseCase };
