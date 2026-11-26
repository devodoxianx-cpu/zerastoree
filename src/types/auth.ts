export interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

