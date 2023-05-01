export interface LoginRequest {
  email: Email;
  password: Password;
}

export interface TokenResponse {
  accessToken: Token;
  refreshToken: Token;
  accessExpiresIn: Milliseconds;
  refreshExpiresIn: Milliseconds;
}

export interface RefreshTokenRequest {
  refreshToken: Token;
}