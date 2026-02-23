// Un DTO (Data Transfer Object) es una estructura de datos simple
// utilizada para transportar información entre capas del sistema.
//
// No contiene lógica de negocio ni comportamiento,
// únicamente representa datos necesarios para ejecutar
// un caso de uso o devolver un resultado.
//
// Los DTOs pertenecen generalmente a la capa Application,
// ya que definen el contrato de entrada y salida
// de los Casos de Uso.
//
// A diferencia de las Entidades y los Value Objects,
// un DTO no garantiza invariantes del dominio;
// su propósito es facilitar la comunicación
// entre Presentation, Application e Infrastructure.
//
// Un DTO describe "qué datos se necesitan",
// pero no define "cómo deben comportarse".

export type SignInEmailInput = {
  email: string;
  password: string;
};
