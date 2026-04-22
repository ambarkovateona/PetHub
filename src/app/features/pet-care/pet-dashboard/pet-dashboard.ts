// Glavna dashboard komponenta za pet-care - prikazuva lista na mileniinja

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetCareService } from '../../../core/services/pet-care';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-pet-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-dashboard.html',
  styleUrl: './pet-dashboard.css'
})
export class PetDashboardComponent {
  pets: Pet[] = [];

  constructor(private petCareService: PetCareService) {
    // Gi vchituva site mileniinja od servisot
    this.pets = this.petCareService.getAllPets();
  }

  // Presmetka na vozrast za sekoj mileniче
  getAge(birthDate: string): string {
    return this.petCareService.calculateAge(birthDate);
  }

  // Brishenje na mileniче
  deletePet(id: number): void {
    this.petCareService.deletePet(id);
    this.pets = this.petCareService.getAllPets();
  }
}