// Model za korisnikot i auth sostojbata

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;       // vo realen sistem - hash
  phone?: string;
  city?: string;
  avatar?: string;
  createdAt: string;
  adoptedPets?: number[]; // IDs na vdomeni mileniinja
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}