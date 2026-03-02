import { Email } from "../value-objects";
import { EmailDomainNotAllowedError } from "../errors";

class EmailDomainPolicy {
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

export { EmailDomainPolicy };
