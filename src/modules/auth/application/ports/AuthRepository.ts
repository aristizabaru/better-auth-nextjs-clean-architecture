import { SignInEmailInput } from "../dtos/SignInEmailInput";
import { SignInResult } from "../dtos/SignInResult";
import { SignUpEmailInput } from "../dtos/SignUpEmailInput";
import { SignUpResult } from "../dtos/SignUpResult";

export interface AuthRepository {
  signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult>;
  signInWithEmail(input: SignInEmailInput): Promise<SignInResult>;
}
