/**
 * ApplicationError:
 * Error del proceso (Application). Representa un fallo en la ejecución
 * de un caso de uso o una colaboración externa, sin ser una invariante del dominio.
 *
 * - code: identificador estable para mapping en Presentation.
 * - prototype fix: garantiza instanceof correcto.
 */
abstract class ApplicationError<TCode extends string> extends Error {
  public abstract readonly code: TCode;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
  }
}

export { ApplicationError };
