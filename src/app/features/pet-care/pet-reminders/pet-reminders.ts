// Komponenta za prikaz i dodavanje potsetnici za milenicheto

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PetCareService } from '../../../core/services/pet-care';
import { Pet } from '../../../core/models/pet.model';
import { PetReminder } from '../../../core/models/pet-reminder.model';

@Component({
  selector: 'app-pet-reminders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-reminders.html',
  styleUrl: './pet-reminders.css'
})
export class PetRemindersComponent {
  pet: Pet | undefined;
  reminders: PetReminder[] = [];

  // Kontrolira dali formata e vidliva
  showForm: boolean = false;

  // Nov potsетnik - prazna forma
  newReminder: PetReminder = {
    id: 0,
    petId: 0,
    type: 'Вакцинација',
    title: '',
    date: '',
    completed: false,
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
      this.reminders = this.petCareService.getRemindersByPet(+id);
      this.newReminder.petId = +id;
    }
  }

  // Dodava nov potsетnik
  addReminder(): void {
    this.newReminder.id = Date.now();
    this.petCareService.addReminder({ ...this.newReminder });
    this.reminders = this.petCareService.getRemindersByPet(this.newReminder.petId);

    // Resetira formata
    this.newReminder = {
      id: 0,
      petId: this.newReminder.petId,
      type: 'Вакцинација',
      title: '',
      date: '',
      completed: false,
      notes: ''
    };
    this.showForm = false;
  }

  // Oznacuva potsетnik kako izvrsen/neizvrsen
  toggleReminder(id: number): void {
    this.petCareService.toggleReminder(id);
    if (this.pet) {
      this.reminders = this.petCareService.getRemindersByPet(this.pet.id);
    }
  }

  // Brishenje na potsетnik
  deleteReminder(id: number): void {
    this.petCareService.deleteReminder(id);
    if (this.pet) {
      this.reminders = this.petCareService.getRemindersByPet(this.pet.id);
    }
  }

  // Ikona spored tip na potsетnik
  getReminderIcon(type: string): string {
    if (type === 'Вакцинација') return '💉';
    if (type === 'Преглед') return '🏥';
    if (type === 'Храненје') return '🍖';
    return '🔔';
  }

  // Proveruva dali potsетnikot e minат
  isOverdue(date: string): boolean {
    return new Date(date) < new Date() ;
  }
}