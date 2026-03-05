import type {
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
} from "../../dtos";

/**
 * AuthService (Port - Service):
 * Integración con proveedor externo de autenticación.
 *
 * Nota:
 * - Application no transporta Headers/cookies.
 * - Infrastructure resuelve el contexto técnico requerido por el proveedor.
 */
interface AuthService {
  signUpWithEmail(input: SignUpEmailInputDTO): Promise<SignUpResultDTO>;
  signInWithEmail(input: SignInEmailInputDTO): Promise<SignInResultDTO>;
  signOut(): Promise<void>;
}

export type { AuthService };
