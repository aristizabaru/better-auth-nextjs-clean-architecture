import { DomainError } from "./domain-error.base";

class InvalidEmailDomainError extends DomainError<"INVALID_EMAIL_DOMAIN"> {
  readonly code = "INVALID_EMAIL_DOMAIN" as const;

  constructor(public readonly rawValue?: string) {
    super("INVALID_EMAIL_DOMAIN");
  }
}

export { InvalidEmailDomainError };
