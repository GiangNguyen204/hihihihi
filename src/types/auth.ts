// Authentication Types

export interface LoginRequest extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface RegisterRequest extends Record<string, unknown> {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  role?: string;
  avatar?: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest extends Record<string, unknown> {
  refreshToken: string;
}
