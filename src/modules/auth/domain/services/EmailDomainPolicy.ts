import { Email } from "../value-objects";
import { EmailDomainNotAllowedError } from "../errors";

// Un Domain Service representa una regla o política del negocio
// que no pertenece naturalmente a una Entidad ni a un Value Object,
// pero que forma parte del dominio del sistema.
//
// Contiene lógica pura del negocio (sin dependencias técnicas),
// y puede ser reutilizado por múltiples casos de uso.
//
// A diferencia de un Use Case, que orquesta un proceso,
// el Domain Service encapsula una regla conceptual del modelo.
// A diferencia de Infrastructure Services, no depende de SDKs,
// bases de datos ni frameworks.
//
// Representa reglas del negocio que describen "cómo debe comportarse"
// el sistema en términos del dominio, independientemente
// de detalles técnicos o de implementación.

export class EmailDomainPolicy {
  /**
   * Regla del dominio:
   * - Si allowedDomains está vacío => no hay restricción.
   * - Si hay dominios => el email debe pertenecer a uno de ellos.
   */
  assertAllowed(email: Email, allowedDomains: string[]): void {
    if (allowedDomains.length === 0) return;

    const allowed = allowedDomains
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);

    if (!allowed.includes(email.domain)) {
      throw new EmailDomainNotAllowedError(email.domain, allowed);
    }
  }
}
