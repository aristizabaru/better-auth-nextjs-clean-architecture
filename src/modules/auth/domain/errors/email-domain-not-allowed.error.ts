// Domain Error:
// Un Error de Dominio representa una violación explícita
// de una regla del modelo del dominio.
//
// No describe fallos técnicos (como errores de red,
// base de datos o infraestructura), sino situaciones
// en las que una invariante o política del negocio
// ha sido quebrantada.
//
// Vive en la capa Domain porque forma parte del lenguaje
// ubicuo del sistema. Expresa algo que "no puede ocurrir"
// según las reglas del modelo.
//
// Es tipado y explícito, lo que permite:
// - Diferenciar claramente errores del negocio
//   de errores técnicos.
// - Mapearlos adecuadamente en la capa de Presentation.
// - Mantener independencia respecto a frameworks.
//
// Un Error de Dominio no conoce HTTP, status codes,
// bases de datos ni detalles externos.
// Solo comunica una violación conceptual del dominio.

class EmailDomainNotAllowedError extends Error {
  readonly code = "EMAIL_DOMAIN_NOT_ALLOWED" as const;

  constructor(
    public readonly domain: string,
    public readonly allowedDomains: string[],
  ) {
    super("EMAIL_DOMAIN_NOT_ALLOWED");
  }
}

export { EmailDomainNotAllowedError };
