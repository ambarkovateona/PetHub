// Glavna stranica na shopot - lista na proizvodi so filtri i smart preporaki

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShopService } from '../../../core/services/shop';
import { PetCareService } from '../../../core/services/pet-care';
import { Product } from '../../../core/models/product.model';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shop-list.html',
  styleUrl: './shop-list.css'
})
export class ShopListComponent {
  // Site proizvodi i filtrirani
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  // Smart preporaki - od pet profilite
  recommendedProducts: Product[] = [];
  userPets: Pet[] = [];

  // Filtri
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedPetType: string = '';
  vetApprovedOnly: boolean = false;
  sortBy: string = 'popular';

  // Koshnicka brojac i PawPoints
  cartCount: number = 0;
  pawPoints: number = 0;

  // Kategorii za filtri
  categories: string[] = [
    'Храна за кучиња',
    'Храна за мачки',
    'Играчки',
    'Шампони',
    'Легла',
    'Суплементи'
  ];

  constructor(
    private shopService: ShopService,
    private petCareService: PetCareService
  ) {
    this.allProducts = this.shopService.getAllProducts();
    this.filteredProducts = [...this.allProducts];
    this.cartCount = this.shopService.getCartCount();
    this.pawPoints = this.shopService.getPawPoints().total;

    // Gi prezema pet profilite za smart preporaki
    this.userPets = this.petCareService.getAllPets();
    this.loadRecommendations();
  }

  // Generira smart preporaki od prviot mileniче vo profilot
  loadRecommendations(): void {
    if (this.userPets.length > 0) {
      const pet = this.userPets[0];
      const age = this.petCareService.calculateAge(pet.birthDate);
      const ageGroup = this.getAgeGroup(age);
      this.recommendedProducts = this.shopService.getRecommendedProducts(
        pet.type, ageGroup, 'Сите'
      );
    }
  }

  // Konvertira vozrast vo grupa
  getAgeGroup(age: string): string {
    if (age.includes('мес') && !age.includes('год')) return 'Младо';
    const years = parseInt(age);
    if (years < 2) return 'Младо';
    if (years >= 7) return 'Старо';
    return 'Возрасно';
  }

  // Filtriranje i sortiranje
  filterProducts(): void {
    let result = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory === '' || p.category === this.selectedCategory) &&
      (this.selectedPetType === '' || p.petType.includes(this.selectedPetType)) &&
      (!this.vetApprovedOnly || p.vetApproved)
    );

    // Sortiranje
    result = result.sort((a, b) => {
      if (this.sortBy === 'price_asc')  return a.price - b.price;
      if (this.sortBy === 'price_desc') return b.price - a.price;
      if (this.sortBy === 'rating')     return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popular
    });

    this.filteredProducts = result;
  }

  // Reset na filtri
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedPetType = '';
    this.vetApprovedOnly = false;
    this.sortBy = 'popular';
    this.filteredProducts = [...this.allProducts];
  }

  // Dodava vo koshnicka
  addToCart(event: Event, product: Product): void {
    event.stopPropagation();
    event.preventDefault();
    this.shopService.addToCart(product);
    this.cartCount = this.shopService.getCartCount();
  }

  // Formatiranje na cena vo denari
  formatPrice(price: number): string {
    return price.toLocaleString('mk-MK') + ' ден';
  }

  // Generira zvezdici za rating
  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }
}