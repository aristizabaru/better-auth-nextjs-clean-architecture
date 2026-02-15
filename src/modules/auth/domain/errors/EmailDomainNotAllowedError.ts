export class EmailDomainNotAllowedError extends Error {
  readonly code = "EMAIL_DOMAIN_NOT_ALLOWED" as const;

  constructor(
    public readonly domain: string,
    public readonly allowedDomains: string[],
  ) {
    super("EMAIL_DOMAIN_NOT_ALLOWED");
  }
}
