export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginRequest {
  name: string;
  email: string;
  password: string;
}
