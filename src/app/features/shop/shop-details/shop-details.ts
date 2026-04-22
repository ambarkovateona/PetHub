// Detaljna stranica za eden proizvod so opcija za dodavanje vo koshnicka

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../../core/services/shop';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-details.html',
  styleUrl: './shop-details.css'
})
export class ShopDetailsComponent {
  product: Product | undefined;
  cartCount: number = 0;
  added: boolean = false; // pokazuva potvrda po dodavanje

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Ja vchituva ID od URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.shopService.getProductById(+id);
    }
    this.cartCount = this.shopService.getCartCount();
  }

  // Dodava vo koshnicka so animacija na potvrda
  addToCart(): void {
    if (this.product) {
      this.shopService.addToCart(this.product);
      this.cartCount = this.shopService.getCartCount();
      this.added = true;
      // Po 2 sekundi ja resetira potvrdата
      setTimeout(() => this.added = false, 2000);
    }
  }

  // Formatiranje na cena
  formatPrice(price: number): string {
    return price.toLocaleString('mk-MK') + ' ден';
  }

  // Generira zvezdici za rating
  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }

  // Vrakanje na shopot
  goBack(): void {
    this.router.navigate(['/shop']);
  }
}