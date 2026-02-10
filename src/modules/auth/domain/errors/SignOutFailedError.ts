export class SignOutFailedError extends Error {
  readonly code = "SIGN_OUT_FAILED" as const;

  constructor() {
    super("SIGN_OUT_FAILED");
  }
}
