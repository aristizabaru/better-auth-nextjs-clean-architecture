import {
  AllowedEmailDomains,
  Email,
  EmailDomainAllowListPolicy,
} from "@/modules/auth/domain";
import type { SignUpEmailInputDTO, SignUpResultDTO } from "../dtos";
import type { AllowedEmailDomainsProvider, AuthService } from "../ports";

/**
 * SignUpWithEmailUseCase:
 * Orquesta el registro con email (reglas del proceso).
 *
 * Regla del proceso:
 * - Consultar allowlist de dominios y aplicar la política del dominio
 *   antes de invocar el sistema externo de autenticación.
 */
class SignUpWithEmailUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly allowedDomainsProvider: AllowedEmailDomainsProvider,
    private readonly emailDomainAllowListPolicy: EmailDomainAllowListPolicy,
  ) {}

  async execute(input: SignUpEmailInputDTO): Promise<SignUpResultDTO> {
    const email = new Email(input.email);

    const allowedDomains: AllowedEmailDomains =
      await this.allowedDomainsProvider.getAllowedDomains();
    this.emailDomainAllowListPolicy.assertAllowed(email, allowedDomains);

    return this.authService.signUpWithEmail({
      name: input.name,
      email: email.value,
      password: input.password,
    });
  }
}

export { SignUpWithEmailUseCase };
