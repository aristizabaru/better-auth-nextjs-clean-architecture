import { InvalidEmailError } from "../errors";

export class Email {
  public readonly value: string;

  constructor(raw: string) {
    const normalized = raw.trim().toLowerCase();

    // Regla del dato (invariante): debe ser un email válido (mínimo razonable)
    if (!Email.isValid(normalized)) {
      throw new InvalidEmailError();
    }

    this.value = normalized;
  }

  get domain(): string {
    return this.value.split("@").at(1) ?? "";
  }

  // Regla técnica mínima: no uses regex gigante, pero sí algo razonable
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
