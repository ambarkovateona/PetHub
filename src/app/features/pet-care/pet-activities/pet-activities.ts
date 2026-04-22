// Komponenta za prikaz i dodavanje aktivnosti na milenicheto

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PetCareService } from '../../../core/services/pet-care';
import { Pet } from '../../../core/models/pet.model';
import { PetActivity } from '../../../core/models/pet-activity.model';

@Component({
  selector: 'app-pet-activities',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-activities.html',
  styleUrl: './pet-activities.css'
  
})
export class PetActivitiesComponent {
  pet: Pet | undefined;
  activities: PetActivity[] = [];

  // Kontrolira dali formata e vidliva
  showForm: boolean = false;

  // Nova aktivnost - prazna forma
  newActivity: PetActivity = {
    id: 0,
    petId: 0,
    type: 'Прошетка',
    date: new Date().toISOString().slice(0, 16),
    duration: 30,
    notes: ''
  };

  constructor(
    private petCareService: PetCareService,
    private route: ActivatedRoute
  ) {
    // Ja vchituva ID od URL i gi prezema podatocite
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pet = this.petCareService.getPetById(+id);
      this.activities = this.petCareService.getActivitiesByPet(+id);
      this.newActivity.petId = +id;
    }
  }

  // Dodava nova aktivnost
  addActivity(): void {
    this.newActivity.id = Date.now();
    this.petCareService.addActivity({ ...this.newActivity });
    this.activities = this.petCareService.getActivitiesByPet(this.newActivity.petId);

    // Resetira formata
    this.newActivity = {
      id: 0,
      petId: this.newActivity.petId,
      type: 'Прошетка',
      date: new Date().toISOString().slice(0, 16),
      duration: 30,
      notes: ''
    };
    this.showForm = false;
  }

  // Brishenje na aktivnost
  deleteActivity(id: number): void {
    this.petCareService.deleteActivity(id);
    if (this.pet) {
      this.activities = this.petCareService.getActivitiesByPet(this.pet.id);
    }
  }

  // Ikona spored tip na aktivnost
  getActivityIcon(type: string): string {
    if (type === 'Прошетка') return '🦮';
    if (type === 'Игра') return '🎾';
    if (type === 'Храненје') return '🍖';
    return '🐾';
  }
}