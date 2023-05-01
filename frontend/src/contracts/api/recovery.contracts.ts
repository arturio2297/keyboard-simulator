export interface SendRecoveryPasswordCodeRequest {
  email: Email;
}

export interface ConfirmRecoveryPasswordRequest {
  email: Email;
  code: Code;
  password: Password;
}