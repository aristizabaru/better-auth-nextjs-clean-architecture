import { InvalidEmailDomainError } from "../errors/invalid-email-domain.error";

/**
 * EmailDomain:
 * Value Object que representa el concepto "dominio de correo"
 * (la parte posterior al '@').
 *
 * Encapsula:
 * - Normalización canónica del dominio (trim + lowercase).
 * - Validación mínima razonable para el dominio.
 *
 * Nota: no pretende ser validación RFC completa; define el estándar
 * aceptado por el dominio del sistema.
 */
class EmailDomain {
  public readonly value: string;

  constructor(raw: string) {
    const normalized = EmailDomain.normalize(raw);

    if (!EmailDomain.isValid(normalized)) {
      throw new InvalidEmailDomainError(raw);
    }

    this.value = normalized;
  }

  equals(other: EmailDomain): boolean {
    return this.value === other.value;
  }

  static normalize(raw: string): string {
    return raw.trim().toLowerCase();
  }

  static isValid(domain: string): boolean {
    if (!domain) return false;
    if (domain.includes("@")) return false;

    const dot = domain.lastIndexOf(".");
    if (dot <= 0) return false;
    if (dot >= domain.length - 1) return false;

    return true;
  }
}

export { EmailDomain };
