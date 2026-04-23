import { Component, OnInit } from '@angular/core';
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
export class FavoritesComponent implements OnInit {

  favorites: AdoptionPet[] = [];

  constructor(private adoptionService: AdoptionService) {}

  ngOnInit(): void {
    this.favorites = this.adoptionService.getFavorites();
  }

  removeFavorite(pet: AdoptionPet): void {
    this.adoptionService.removeFromFavorites(pet.id);
    this.favorites = this.adoptionService.getFavorites();
  }
}