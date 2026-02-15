export class InvalidEmailError extends Error {
  readonly code = "INVALID_EMAIL" as const;

  constructor(message = "INVALID_EMAIL") {
    super(message);
  }
}
