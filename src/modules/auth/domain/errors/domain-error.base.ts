/**
 * DomainError:
 * Error semántico del dominio. Representa una violación explícita
 * de una regla/invariante del modelo y no depende de detalles técnicos.
 *
 * - code: identificador estable para mapping en Presentation.
 * - name: nombre de clase para debugging/observabilidad.
 */
abstract class DomainError<TCode extends string> extends Error {
  public abstract readonly code: TCode;

  protected constructor(message: string) {
    super(message);

    // Fix clásico para herencia de Error en TS/JS
    Object.setPrototypeOf(this, new.target.prototype);

    // Útil para logs y debugging
    this.name = new.target.name;
  }
}

export { DomainError };
