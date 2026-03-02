import { Email, EmailDomainPolicy } from "@/modules/auth/domain";
import { SignUpEmailInputDTO, SignUpResultDTO } from "../dtos";
import { AllowedEmailDomainsProvider, AuthRepository } from "../ports";

class SignUpWithEmailUseCase {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly allowedDomainsProvider: AllowedEmailDomainsProvider,
    private readonly emailDomainPolicy: EmailDomainPolicy,
  ) {}

  async execute(input: SignUpEmailInputDTO): Promise<SignUpResultDTO> {
    // Creación del Value Object
    const email = new Email(input.email);

    // Regla del proceso (política)
    const allowedDomains = this.allowedDomainsProvider.getAllowedDomains();
    this.emailDomainPolicy.assertAllowed(email, allowedDomains);

    // Volvemos al DTO para el port (porque el port sigue siendo string-based)
    return this.authRepo.signUpWithEmail({
      ...input,
      email: email.value,
    });
  }
}

export { SignUpWithEmailUseCase };
