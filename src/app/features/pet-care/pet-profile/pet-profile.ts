// Komponenta za kreiranje i ureduvanje na profil na mileniче

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PetCareService } from '../../../core/services/pet-care';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-profile.html',
  styleUrl: './pet-profile.css'
})
export class PetProfileComponent {
  // Dali e vo edit mode ili add mode
  isEditMode: boolean = false;
  petId: number | null = null;

  // Forma podatoci
  pet: Pet = {
    id: 0,
    name: '',
    type: 'Куче',
    breed: '',
    birthDate: '',
    gender: 'Машко',
    image: '',
    weight: 0,
    weightHistory: []
  };

  constructor(
    private petCareService: PetCareService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Proveruva dali e edit mode preku URL parametarot :id
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.petId = +id;
      const existing = this.petCareService.getPetById(this.petId);
      if (existing) this.pet = { ...existing };
    }
  }

  // Zacuvuva nov ili ureduvanje na postoecki mileniче
  savePet(): void {
    if (this.isEditMode) {
      this.petCareService.updatePet(this.pet);
    } else {
      // Nov ID - pogolem od posledniot
      this.pet.id = Date.now();
      // Prviot vnos na tezina
      if (this.pet.weight > 0) {
        this.pet.weightHistory = [{
          date: new Date().toISOString().split('T')[0],
          weight: this.pet.weight
        }];
      }
      this.petCareService.addPet(this.pet);
    }
    // Po zacuvuvanje vraka na dashboard
    this.router.navigate(['/pet-care']);
  }

  // Otkazi i vrati se na dashboard
  cancel(): void {
    this.router.navigate(['/pet-care']);
  }
}