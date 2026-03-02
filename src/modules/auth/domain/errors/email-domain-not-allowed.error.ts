import { DomainError } from "./domain-error-base.error";

class EmailDomainNotAllowedError extends DomainError<"EMAIL_DOMAIN_NOT_ALLOWED"> {
  readonly code = "EMAIL_DOMAIN_NOT_ALLOWED" as const;

  constructor(
    public readonly domain: string,
    public readonly allowedDomains: string[],
  ) {
    super("EMAIL_DOMAIN_NOT_ALLOWED");
  }
}

export { EmailDomainNotAllowedError };
