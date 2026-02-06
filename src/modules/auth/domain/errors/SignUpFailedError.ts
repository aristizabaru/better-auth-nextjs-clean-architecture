export class SignUpFailedError extends Error {
  readonly code = "SIGN_UP_FAILED" as const;

  constructor() {
    super("SIGN_UP_FAILED");
  }
}
