import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-adoption-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adoption-list.html',
  styleUrl: './adoption-list.css'
})
export class AdoptionListComponent {
  pets: AdoptionPet[] = [];
  filteredPets: AdoptionPet[] = [];
  favorites: AdoptionPet[] = [];

  searchTerm: string = '';
  selectedType: string = '';    // 'Dog' | 'Cat' | ''  — matches service data exactly
  selectedCity: string = '';
  selectedGender: string = '';  // 'Male' | 'Female' | ''
  sortBy: string = 'name';      // 'name' | 'age_asc' | 'age_desc'

  constructor(private adoptionService: AdoptionService) {
    this.pets = this.adoptionService.getAllPets();
    this.favorites = this.adoptionService.getFavorites();
    this.filteredPets = [...this.pets];
  }

  filterPets(): void {
    let result = this.pets.filter(pet =>
      pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || pet.type === this.selectedType) &&
      (this.selectedCity === '' || pet.city === this.selectedCity) &&
      (this.selectedGender === '' || pet.gender === this.selectedGender)
    );

    // Sorting
    result = result.sort((a, b) => {
      if (this.sortBy === 'age_asc')  return a.age - b.age;
      if (this.sortBy === 'age_desc') return b.age - a.age;
      return a.name.localeCompare(b.name); // default: name A-Z
    });

    this.filteredPets = result;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedCity = '';
    this.selectedGender = '';
    this.sortBy = 'name';
    this.filteredPets = [...this.pets];
  }

  /** Check if a pet is already in favorites */
  isFavorite(pet: AdoptionPet): boolean {
    return this.favorites.some(f => f.id === pet.id);
  }

  /** Toggle favorite using the AdoptionService */
  toggleFavorite(event: Event, pet: AdoptionPet): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.isFavorite(pet)) {
      this.adoptionService.addToFavorites(pet);
    }
    // Sync local reference
    this.favorites = this.adoptionService.getFavorites();
  }
}