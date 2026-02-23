import { Email } from "../../domain/value-objects";
import { SignUpEmailInput, SignUpResult } from "../dtos";
import { AllowedEmailDomainsProvider, AuthRepository } from "../ports";
import { EmailDomainPolicy } from "../../domain/services";

// Un Caso de Uso representa una acción específica que el sistema
// puede ejecutar desde la perspectiva del negocio.
//
// Orquesta el flujo de un proceso: recibe datos de entrada (DTOs),
// crea y utiliza Value Objects y Entidades del dominio,
// aplica políticas o servicios del dominio cuando es necesario,
// y se comunica con repositorios o servicios externos
// a través de puertos definidos en Application.
//
// Contiene reglas del proceso (qué debe ocurrir en esta acción),
// pero no contiene detalles técnicos ni implementaciones concretas.
//
// Actúa como coordinador entre Presentation, Domain
// e Infrastructure, manteniendo las dependencias dirigidas
// hacia el dominio.
//
// El Caso de Uso decide "cuándo" aplicar reglas;
// el dominio define "cómo" se comportan esas reglas.

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
