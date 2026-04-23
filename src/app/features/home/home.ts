// Home page - glavna stranica na PetHub

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdoptionService } from '../../core/services/adoption';
import { LostFoundService } from '../../core/services/lost-found';
import { ShopService } from '../../core/services/shop';
import { AdoptionPet } from '../../core/models/adoption-pet.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Featured mileniinja - prvi 3
  featuredPets: AdoptionPet[] = [];

  // Statistika
  totalPets: number = 0;
  lostCount: number = 0;
  reunitedCount: number = 0;
  totalProducts: number = 0;

  constructor(
    private adoptionService: AdoptionService,
    private lostFoundService: LostFoundService,
    private shopService: ShopService
  ) {
    // Gi prezema prvite 3 mileniinja za featured sekcijata
    this.featuredPets = this.adoptionService.getAllPets().slice(0, 3);
    this.totalPets = this.adoptionService.getAllPets().length;
    this.lostCount = this.lostFoundService.getLostCount();
    this.reunitedCount = this.lostFoundService.getReunitedCount();
    this.totalProducts = this.shopService.getAllProducts().length;
  }

  // Ikona spored vid na mileniче
  getPetIcon(type: string): string {
    if (type === 'Dog') return '🐶';
    if (type === 'Cat') return '🐱';
    return '🐾';
  }
}