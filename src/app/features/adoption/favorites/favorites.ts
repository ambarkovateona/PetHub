import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent {
  favorites: AdoptionPet[] = [];

  constructor(private adoptionService: AdoptionService) {
    this.favorites = this.adoptionService.getFavorites();
  }

  removeFromFavorites(pet: AdoptionPet): void {
    this.adoptionService.removeFromFavorites(pet.id);
    // Refresh local array from service
    this.favorites = this.adoptionService.getFavorites();
  }
}