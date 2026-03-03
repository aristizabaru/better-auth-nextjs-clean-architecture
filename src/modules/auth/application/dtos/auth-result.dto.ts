/**
 * AuthenticationResultDTO:
 * DTO de salida que describe el resultado de un flujo de autenticación
 * en términos de Application (contrato hacia Presentation).
 *
 * Importante: es un DTO (transporte), no un modelo del dominio.
 */
type AuthenticationResultDTO =
  | { status: "SIGNED_IN"; userId: string; email: string }
  | { status: "PENDING_VERIFICATION"; userId: string; email: string };

type SignUpResultDTO = AuthenticationResultDTO;
type SignInResultDTO = AuthenticationResultDTO;

export type { AuthenticationResultDTO, SignUpResultDTO, SignInResultDTO };
