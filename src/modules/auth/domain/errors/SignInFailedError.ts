export class SignInFailedError extends Error {
  readonly code = "SIGN_IN_FAILED" as const;

  constructor() {
    super("SIGN_IN_FAILED");
  }
}
