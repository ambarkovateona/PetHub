// Komponenta za koshnickata - pregled, kolicina i PawPoints

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../../core/services/shop';
import { CartItem } from '../../../core/models/cart-item.model';
import { PawPoints } from '../../../core/models/paw-points.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  pawPoints: PawPoints;

  // Kontrolira dali e prikazana potvrdата za naracka
  orderPlaced: boolean = false;
  earnedPoints: number = 0;

  // Dali korisnikot saka da potrosí poeni
  usePoints: boolean = false;

  constructor(private shopService: ShopService) {
    this.cartItems = this.shopService.getCart();
    this.pawPoints = this.shopService.getPawPoints();
  }

  // Vkupna suma bez popust
  getSubtotal(): number {
    return this.shopService.getCartTotal();
  }

  // Popust od PawPoints (100 poeni = 50 den)
  getPointsDiscount(): number {
    if (!this.usePoints) return 0;
    const maxDiscount = Math.floor(this.pawPoints.total / 100) * 50;
    return Math.min(maxDiscount, this.getSubtotal());
  }

  // Konecna suma
  getTotal(): number {
    return this.getSubtotal() - this.getPointsDiscount();
  }

  // Kolku poeni ke se potrosat
  getPointsToUse(): number {
    return Math.ceil(this.getPointsDiscount() / 50) * 100;
  }

  // Gi zbira site PawPoints od koshnickata
  getTotalEarnPoints(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.pawPoints * item.quantity, 0
    );
  }

  // Azuriranje na kolicina
  updateQuantity(productId: number, quantity: number): void {
    this.shopService.updateQuantity(productId, quantity);
    this.cartItems = this.shopService.getCart();
  }

  // Brishenje od koshnicka
  removeItem(productId: number): void {
    this.shopService.removeFromCart(productId);
    this.cartItems = this.shopService.getCart();
  }

  // Naracka - checkout
  placeOrder(): void {
    if (this.usePoints && this.getPointsDiscount() > 0) {
      this.shopService.redeemPawPoints(this.getPointsToUse());
    }
    this.earnedPoints = this.getTotalEarnPoints();
    this.shopService.checkout();
    this.cartItems = this.shopService.getCart();
    this.pawPoints = this.shopService.getPawPoints();
    this.orderPlaced = true;
  }

  // Formatiranje na cena
  formatPrice(price: number): string {
    return price.toLocaleString('mk-MK') + ' ден';
  }
}