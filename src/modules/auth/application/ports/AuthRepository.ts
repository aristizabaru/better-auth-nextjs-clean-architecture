import { SignUpEmailInput } from "../dtos/SignUpEmailInput";
import { SignUpResult } from "../dtos/SignUpResult";

export interface AuthRepository {
  signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult>;
}
