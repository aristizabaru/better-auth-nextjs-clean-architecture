import type {
  SignInEmailInputDTO,
  SignInResultDTO,
  SignUpEmailInputDTO,
  SignUpResultDTO,
} from "../../dtos";
import type { AuthRequestContext } from "../providers";

/**
 * AuthService (Port - Service):
 * Abstrae la integración con el sistema externo de autenticación
 * (por ejemplo Better Auth), sin exponer SDKs, HTTP, cookies, etc.
 *
 * Importante:
 * - No es Repository: no persiste agregados del dominio.
 * - Representa colaboración externa necesaria para completar casos de uso.
 */
interface AuthService {
  signUpWithEmail(input: SignUpEmailInputDTO): Promise<SignUpResultDTO>;
  signInWithEmail(input: SignInEmailInputDTO): Promise<SignInResultDTO>;

  /**
   * Cierre de sesión.
   * El "context" es opaco (provisto por RequestContextProvider).
   */
  signOut(context: AuthRequestContext): Promise<void>;
}

export type { AuthService };
