// Glavna navigacija - sticky navbar so blur efekt pri scroll

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../../core/services/shop';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  // Kontrolira dali e scrollano
  isScrolled: boolean = false;

  // Kontrolira dali e otvoren mobilniot meni
  menuOpen: boolean = false;

  // Brojac na koshnicka
  cartCount: number = 0;

  constructor(
    private shopService: ShopService,
    public authService: AuthService
  ) {
    this.cartCount = this.shopService.getCartCount();
  }

  // Slusa scroll za da go promeni stilot na navbar
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  // Otvora/zatvora mobilniot meni
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Zatvora mobilniot meni po klik na link
  closeMenu(): void {
    this.menuOpen = false;
  }
}