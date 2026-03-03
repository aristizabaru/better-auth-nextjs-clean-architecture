import { ApplicationError } from "./application-error.base";

type AuthProviderOperationFailedCode =
  | "AUTH_SIGN_UP_FAILED"
  | "AUTH_SIGN_IN_FAILED"
  | "AUTH_SIGN_OUT_FAILED";

/**
 * AuthProviderOperationFailedError:
 * Error de Application que indica que el proveedor externo de autenticación
 * falló al ejecutar una operación (sign up / sign in / sign out).
 *
 * No es un error del dominio; es un error del proceso o integración.
 */
class AuthProviderOperationFailedError extends ApplicationError<AuthProviderOperationFailedCode> {
  readonly code: AuthProviderOperationFailedCode;

  constructor(
    code: AuthProviderOperationFailedCode,
    public readonly cause?: unknown,
  ) {
    super(code);
    this.code = code;
  }
}

export { AuthProviderOperationFailedError };
