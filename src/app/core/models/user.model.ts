// Model za korisnikot i auth sostojbata

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  avatar?: string;
  createdAt: string;
  adoptedPets?: number[];
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}