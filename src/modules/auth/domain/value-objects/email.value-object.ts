import { InvalidEmailError } from "../errors";
import { EmailDomain } from "./email-domain.value-object";

/**
 * Email:
 * Value Object que representa el concepto "correo electrónico"
 * como dato del dominio, con invariantes y representación canónica.
 */
class Email {
  public readonly value: string;

  constructor(raw: string) {
    const normalized = Email.normalize(raw);

    if (!Email.isValid(normalized)) {
      throw new InvalidEmailError(raw);
    }

    this.value = normalized;
  }

  /**
   * Deriva el dominio como Value Object.
   * Si Email existe, por invariante el dominio debe ser derivable.
   */
  get domain(): EmailDomain {
    const domainPart = this.value.split("@")[1];
    return new EmailDomain(domainPart);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  static normalize(raw: string): string {
    return raw.trim().toLowerCase();
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
