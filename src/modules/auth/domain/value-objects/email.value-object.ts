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
