// Glavna navigacija - sticky navbar so blur efekt pri scroll

import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../../core/services/shop';
import { AuthService } from '../../../core/services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  isScrolled: boolean = false;
  menuOpen:   boolean = false;
  cartCount:  number  = 0;

  private cartSub!: Subscription;

  constructor(
    private shopService: ShopService,
    public  authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartSub = this.shopService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}