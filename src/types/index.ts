export interface User {
  username: string;
  email: string;
  password: string;
  team: string;
  role: 'master' | 'analyst';
}

export interface Support {
  username: string;
  analyst: string;
  team: string;
}

export interface Ticket {
  id: string;
  date: string;
  analyst: string;
  support: string;
  reason: string;
  observation: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}