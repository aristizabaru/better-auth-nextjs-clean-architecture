/**
 * SignInEmailInputDTO:
 * Contrato de entrada para el Caso de Uso de inicio de sesión con email.
 * DTO: sin lógica, sin invariantes del dominio.
 */
type SignInEmailInputDTO = {
  email: string;
  password: string;
};

export type { SignInEmailInputDTO };
