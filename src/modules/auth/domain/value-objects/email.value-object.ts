// Value Objects:
// Los Value Objects representan conceptos del dominio que tienen
// reglas de validación y lógica asociada.
//
// A diferencia de una Entidad, un Value Object no posee identidad
// propia: se define exclusivamente por su valor. Si dos instancias
// contienen el mismo valor, se consideran equivalentes (igualdad por valor).
//
// Su propósito principal es encapsular y proteger las reglas del dato
// (invariantes). Esto significa que un Value Object solo puede existir
// en un estado válido según el dominio: si el valor no cumple las
// invariantes, la construcción debe fallar explícitamente.
//
// Por diseño, deben ser inmutables y exponen una interfaz pequeña,
// expresiva y orientada al lenguaje ubicuo (por ejemplo: normalización,
// derivación de propiedades, comparaciones por valor, etc.).
//
// Viven en la capa Domain y no dependen de infraestructura ni frameworks.
// Su existencia evita los “primitivos anémicos” (cuando conceptos del dominio
// se representan como tipos primitivos sueltos —string, number, boolean—
// sin significado, sin invariantes y con reglas dispersas por el código),
// centralizando el sentido y la consistencia del dato dentro del modelo.

import { InvalidEmailError } from "../errors";

class Email {
  public readonly value: string;

  constructor(emailString: string) {
    const normalized = emailString.trim().toLowerCase();

    // Regla del dato (invariante): debe ser un email válido (mínimo razonable)
    if (!Email.isValid(normalized)) {
      throw new InvalidEmailError();
    }

    this.value = normalized;
  }

  get domain(): string {
    return this.value.split("@").at(1) ?? "";
  }

  static isValid(email: string): boolean {
    if (email.length < 3) return false;
    const at = email.indexOf("@");
    if (at <= 0) return false;
    const dot = email.lastIndexOf(".");
    if (dot < at + 2) return false;
    if (dot >= email.length - 1) return false;

    return true;
  }
}

export { Email };
