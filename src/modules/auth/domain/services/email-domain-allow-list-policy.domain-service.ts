import { EmailDomainNotAllowedError } from "../errors";
import { AllowedEmailDomains, Email } from "../value-objects";

/**
 * EmailDomainPolicy:
 * Regla del dominio: si existe allowlist, el email debe pertenecer
 * a uno de los dominios permitidos.
 */
class EmailDomainAllowListPolicy {
  assertAllowed(email: Email, allowedDomains: AllowedEmailDomains): void {
    if (!allowedDomains.isRestricted()) return;

    if (!allowedDomains.includes(email.domain)) {
      throw new EmailDomainNotAllowedError(
        email.domain.value,
        allowedDomains.toArray(),
      );
    }
  }
}

export { EmailDomainAllowListPolicy };
