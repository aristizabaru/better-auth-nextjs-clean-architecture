import { DomainError } from "./domain-error-base.error";

class InvalidEmailError extends DomainError<"INVALID_EMAIL"> {
  readonly code = "INVALID_EMAIL" as const;

  constructor(public readonly rawValue?: string) {
    super("INVALID_EMAIL");
  }
}

export { InvalidEmailError };
