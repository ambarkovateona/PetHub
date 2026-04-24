import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

type Tab       = 'login' | 'register';
type Strength  = 'weak' | 'fair' | 'strong' | '';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  activeTab: Tab = 'login';

  // ── Login ──
  loginForm = {
    email:    '',
    password: '',
    remember: false
  };
  loginError:    string  = '';
  loginLoading:  boolean = false;
  showLoginPass: boolean = false;

  // ── Register ──
  registerForm = {
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
    phone:           '',
    city:            '',
    avatar:          ''
  };
  registerError:    string   = '';
  registerSuccess:  string   = '';
  registerLoading:  boolean  = false;
  showRegPass:      boolean  = false;
  showRegConfPass:  boolean  = false;
  passwordStrength: Strength = '';

  private returnUrl: string = '/';

constructor(
  private authService: AuthService,
  private router: Router,
  private route: ActivatedRoute
) {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/']);
  }
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  const tab = this.route.snapshot.queryParams['tab'];
  if (tab === 'register') {
    this.activeTab = 'register';
  }
}

  // ── Tabs ──
  setTab(tab: Tab): void {
    this.activeTab       = tab;
    this.loginError      = '';
    this.registerError   = '';
    this.registerSuccess = '';
  }

  // ── Login ──
  onLogin(): void {
    this.loginError = '';

    if (!this.loginForm.email || !this.loginForm.password) {
      this.loginError = 'Внесете email и лозинка.'; return;
    }
    if (!this.isValidEmail(this.loginForm.email)) {
      this.loginError = 'Внесете валиден email.'; return;
    }
    if (this.loginForm.password.length < 6) {
      this.loginError = 'Лозинката мора да има минимум 6 карактери.'; return;
    }

    this.loginLoading = true;

    setTimeout(() => {
      const result = this.authService.login(
        this.loginForm.email,
        this.loginForm.password,
        this.loginForm.remember
      );

      this.loginLoading = false;

      if (result.success) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.loginError = result.message;
        if (result.notFound) {
          setTimeout(() => {
            this.setTab('register');
            this.registerForm.email = this.loginForm.email;
          }, 1800);
        }
      }
    }, 800);
  }

  // ── Register ──
  onRegister(): void {
    this.registerError   = '';
    this.registerSuccess = '';

    if (!this.registerForm.fullName.trim()) {
      this.registerError = 'Внесете ime и презиме.'; return;
    }
    if (!this.isValidEmail(this.registerForm.email)) {
      this.registerError = 'Внесете валиден email.'; return;
    }
    if (this.registerForm.password.length < 6) {
      this.registerError = 'Лозинката мора да има минимум 6 карактери.'; return;
    }
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.registerError = 'Лозинките не се совпаѓаат.'; return;
    }

    this.registerLoading = true;

    setTimeout(() => {
      const result = this.authService.register({
        fullName: this.registerForm.fullName,
        email:    this.registerForm.email,
        password: this.registerForm.password,
        phone:    this.registerForm.phone,
        city:     this.registerForm.city,
        avatar:   this.registerForm.avatar
      });

      this.registerLoading = false;

      if (result.success) {
        this.registerSuccess = result.message;
        setTimeout(() => this.router.navigateByUrl(this.returnUrl), 1200);
      } else {
        this.registerError = result.message;
      }
    }, 800);
  }

  // ── Password strength ──
  checkPasswordStrength(password: string): void {
    if (!password) { this.passwordStrength = ''; return; }
    const hasUpper  = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const score = [password.length >= 8, hasUpper, hasNumber, hasSymbol]
      .filter(Boolean).length;
    if (score <= 1)      this.passwordStrength = 'weak';
    else if (score <= 2) this.passwordStrength = 'fair';
    else                 this.passwordStrength = 'strong';
  }

  // ── Validation ──
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  get loginValid(): boolean {
    return this.isValidEmail(this.loginForm.email) &&
           this.loginForm.password.length >= 6;
  }

  get registerValid(): boolean {
    return this.registerForm.fullName.trim().length > 0 &&
           this.isValidEmail(this.registerForm.email) &&
           this.registerForm.password.length >= 6 &&
           this.registerForm.password === this.registerForm.confirmPassword;
  }

  get strengthLabel(): string {
    if (this.passwordStrength === 'weak')   return 'Слаба';
    if (this.passwordStrength === 'fair')   return 'Средна';
    if (this.passwordStrength === 'strong') return 'Силна';
    return '';
  }
}