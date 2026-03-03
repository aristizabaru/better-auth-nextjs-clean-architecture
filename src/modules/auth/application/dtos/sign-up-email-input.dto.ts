/**
 * SignUpEmailInputDTO:
 * Contrato de entrada para el Caso de Uso de registro con email.
 * DTO: sin lógica, sin invariantes del dominio.
 */
type SignUpEmailInputDTO = {
  name: string;
  email: string;
  password: string;
};

export type { SignUpEmailInputDTO };
