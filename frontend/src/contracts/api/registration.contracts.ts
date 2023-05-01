export interface SendRegistrationCodeRequest {
  email: Email;
}

export interface ConfirmRegistrationRequest {
  email: Email;
  firstname: string;
  lastname: string;
  password: Password;
  code: Code;
}