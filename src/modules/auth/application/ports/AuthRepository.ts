import { SignInResult, SignUpResult } from "../dtos/AuthFlowResult";
import { SignInEmailInput } from "../dtos/SignInEmailInput";
import { SignUpEmailInput } from "../dtos/SignUpEmailInput";

export interface AuthRepository {
  signUpWithEmail(input: SignUpEmailInput): Promise<SignUpResult>;
  signInWithEmail(input: SignInEmailInput): Promise<SignInResult>;
  signOut(request: { headers: Headers }): Promise<void>;
}
