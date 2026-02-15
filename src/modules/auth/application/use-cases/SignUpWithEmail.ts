import { Email } from "../../domain/value-objects";
import { SignUpEmailInput, SignUpResult } from "../dtos";
import { AllowedEmailDomainsProvider, AuthRepository } from "../ports";
import { EmailDomainPolicy } from "../../domain/services";

// Los casos de uso representan las acciones que el sistema puede realizar.
// Son la capa donde se implementa la lógica de negocio específica de cada acción,
// utilizando los Value Objects y las Entidades del dominio, y comunicándose
// con los repositorios a través de los puertos.
// Representan reglas del proceso (lógicas) que dependen del
// “qué estoy haciendo”y que pueden variar

export class SignUpWithEmail {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly allowedDomainsProvider: AllowedEmailDomainsProvider,
    private readonly emailDomainPolicy: EmailDomainPolicy,
  ) {}

  async execute(input: SignUpEmailInput): Promise<SignUpResult> {
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
