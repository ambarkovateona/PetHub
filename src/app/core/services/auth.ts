// Auth servis - in-memory + localStorage so SSR poddrska

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User, AuthState } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USERS_KEY    = 'pethub_users';
  private readonly SESSION_KEY  = 'pethub_session';
  private readonly REMEMBER_KEY = 'pethub_remember';
  private isBrowser: boolean;

  private state: AuthState = {
    user: null,
    isLoggedIn: false
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.restoreSession();
  }

  // ── Proveruva dali sme vo browser ──
  private storage(key: string): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(key);
  }

  private setStorage(key: string, value: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, value);
  }

  private removeStorage(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  // ── Restore session od localStorage ──
  private restoreSession(): void {
    if (!this.isBrowser) return;
    try {
      const remembered = this.storage(this.REMEMBER_KEY);
      const session    = this.storage(this.SESSION_KEY);
      const source     = remembered || session;
      if (source) {
        const user = JSON.parse(source) as User;
        this.state = { user, isLoggedIn: true };
      }
    } catch {
      this.clearSession();
    }
  }

  // ── Gi prezema site korisnici ──
  private getUsers(): User[] {
    if (!this.isBrowser) return [];
    try {
      const raw = this.storage(this.USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // ── Gi zacuvuva korisnicite ──
  private saveUsers(users: User[]): void {
    if (!this.isBrowser) return;
    this.setStorage(this.USERS_KEY, JSON.stringify(users));
  }

  // ── Ja cistí sesijata ──
  private clearSession(): void {
    this.removeStorage(this.SESSION_KEY);
    this.removeStorage(this.REMEMBER_KEY);
    this.state = { user: null, isLoggedIn: false };
  }

  // ── Registracija ──
  register(data: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
    avatar?: string;
  }): { success: boolean; message: string } {

    const users = this.getUsers();

    const exists = users.find(u =>
      u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'Корисник со овој email веќе постои.' };
    }

    const newUser: User = {
      id:          Date.now().toString(),
      fullName:    data.fullName.trim(),
      email:       data.email.toLowerCase().trim(),
      password:    data.password,
      phone:       data.phone?.trim() || '',
      city:        data.city?.trim() || '',
      avatar:      data.avatar || '',
      createdAt:   new Date().toISOString(),
      adoptedPets: []
    };

    users.push(newUser);
    this.saveUsers(users);

    this.state = { user: newUser, isLoggedIn: true };
    this.setStorage(this.SESSION_KEY, JSON.stringify(newUser));

    return { success: true, message: 'Успешна регистрација!' };
  }

  // ── Logiranje ──
  login(
    email: string,
    password: string,
    remember: boolean = false
  ): { success: boolean; message: string; notFound?: boolean } {

    const users = this.getUsers();
    const user  = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!user) {
      return {
        success:  false,
        message:  'Немате профил. Пренасочување кон регистрација…',
        notFound: true
      };
    }

    if (user.password !== password) {
      return { success: false, message: 'Погрешна лозинка. Обидете се повторно.' };
    }

    this.state = { user, isLoggedIn: true };

    if (remember) {
      this.setStorage(this.REMEMBER_KEY, JSON.stringify(user));
    } else {
      this.setStorage(this.SESSION_KEY, JSON.stringify(user));
    }

    return { success: true, message: 'Успешно најавување!' };
  }

  // ── Odjavuvanje ──
  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  // ── Getteri ──
  getCurrentUser(): User | null {
    return this.state.user;
  }

  isLoggedIn(): boolean {
    return this.state.isLoggedIn;
  }

  // ── Azuriranje na profil ──
  updateUser(updated: Partial<User>): void {
    if (!this.state.user) return;

    const users  = this.getUsers();
    const index  = users.findIndex(u => u.id === this.state.user!.id);
    if (index === -1) return;

    const merged = { ...users[index], ...updated };
    users[index] = merged;
    this.saveUsers(users);
    this.state.user = merged;

    if (this.storage(this.REMEMBER_KEY)) {
      this.setStorage(this.REMEMBER_KEY, JSON.stringify(merged));
    } else {
      this.setStorage(this.SESSION_KEY, JSON.stringify(merged));
    }
  }

  // ── Dodava vdomen mileniче ──
  addAdoptedPet(petId: number): void {
    if (!this.state.user) return;
    const adopted = this.state.user.adoptedPets || [];
    if (!adopted.includes(petId)) {
      this.updateUser({ adoptedPets: [...adopted, petId] });
    }
  }

  // ── Proveruva dali milenicheto e vdomen ──
  isAdopted(petId: number): boolean {
    return this.state.user?.adoptedPets?.includes(petId) ?? false;
  }
}