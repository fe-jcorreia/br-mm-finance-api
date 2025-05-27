export interface AuthenticationInput {
  email: string;
  password: string;
}

export interface Authentication {
  token: string;
}

export interface JwtPayload {
  id: string;
}
