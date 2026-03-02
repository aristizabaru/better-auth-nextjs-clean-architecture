import { EmailDomain } from "./email-domain.value-object";

/**
 * AllowedEmailDomains:
 * Value Object que representa una allowlist de dominios.
 *
 * Mantiene una representación canónica:
 * - cada elemento es EmailDomain (normalizado y validado)
 * - deduplicado por valor
 */
class AllowedEmailDomains {
  private readonly domains: EmailDomain[];

  constructor(rawDomains: string[]) {
    const safe = Array.isArray(rawDomains) ? rawDomains : [];

    const parsed = safe.map((d) => new EmailDomain(d));

    const unique: EmailDomain[] = [];
    const seen = new Set<string>();

    for (const d of parsed) {
      if (seen.has(d.value)) continue;
      seen.add(d.value);
      unique.push(d);
    }

    this.domains = unique;
  }

  isRestricted(): boolean {
    return this.domains.length > 0;
  }

  includes(domain: EmailDomain): boolean {
    return this.domains.some((d) => d.equals(domain));
  }

  toArray(): string[] {
    return this.domains.map((d) => d.value);
  }

  equals(other: AllowedEmailDomains): boolean {
    if (this.domains.length !== other.domains.length) return false;
    return this.domains.every((d, i) => d.equals(other.domains[i]));
  }
}

export { AllowedEmailDomains };
