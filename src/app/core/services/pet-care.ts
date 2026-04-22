// Glavni servis za pet-care modulot - upravuva so mileniinja, aktivnosti i potsetnici

import { Injectable } from '@angular/core';
import { Pet, WeightEntry } from '../models/pet.model';
import { PetActivity } from '../models/pet-activity.model';
import { PetReminder } from '../models/pet-reminder.model';

@Injectable({
  providedIn: 'root'
})
export class PetCareService {

  // ── Testni podatoci za mileniinja ──
  private pets: Pet[] = [
    {
      id: 1,
      name: 'Ares',
      type: 'Куче',
      breed: 'Golden Retriever',
      birthDate: '2021-05-10',
      gender: 'Машко',
      image: 'https://placedog.net/400/300',
      weight: 28,
      weightHistory: [
        { date: '2024-01-01', weight: 26 },
        { date: '2024-04-01', weight: 27 },
        { date: '2024-08-01', weight: 28 }
      ]
    },
    {
      id: 2,
      name: 'Мија',
      type: 'Мачка',
      breed: 'Persian',
      birthDate: '2022-08-20',
      gender: 'Женско',
      image: 'https://placekitten.com/400/300',
      weight: 4,
      weightHistory: [
        { date: '2024-02-01', weight: 3.5 },
        { date: '2024-06-01', weight: 4 }
      ]
    }
  ];

  // ── Testni podatoci za aktivnosti ──
  private activities: PetActivity[] = [
    {
      id: 1,
      petId: 1,
      type: 'Прошетка',
      date: '2025-04-20T08:00:00',
      duration: 30,
      notes: 'Утринска прошетка во паркот'
    },
    {
      id: 2,
      petId: 1,
      type: 'Храненје',
      date: '2025-04-20T09:00:00',
      duration: 0,
      notes: 'Утринска оброк'
    },
    {
      id: 3,
      petId: 2,
      type: 'Игра',
      date: '2025-04-20T10:00:00',
      duration: 20,
      notes: 'Игра со топче'
    }
  ];

  // ── Testni podatoci za potsetnici ──
  private reminders: PetReminder[] = [
    {
      id: 1,
      petId: 1,
      type: 'Вакцинација',
      title: 'Годишна вакцина',
      date: '2025-05-15',
      completed: false,
      notes: 'Кај д-р Петров'
    },
    {
      id: 2,
      petId: 2,
      type: 'Преглед',
      title: 'Редовен ветеринарен преглед',
      date: '2025-04-28',
      completed: false,
      notes: ''
    }
  ];

  // ── CRUD za mileniinja ──

  getAllPets(): Pet[] {
    return this.pets;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find(p => p.id === id);
  }

  addPet(pet: Pet): void {
    this.pets.push(pet);
  }

  updatePet(updated: Pet): void {
    const index = this.pets.findIndex(p => p.id === updated.id);
    if (index !== -1) this.pets[index] = updated;
  }

  deletePet(id: number): void {
    this.pets = this.pets.filter(p => p.id !== id);
  }

  // ── Presmetka na vozrast od birthDate ──
  calculateAge(birthDate: string): string {
    const birth = new Date(birthDate);
    const now = new Date();
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    const totalMonths = years * 12 + months;

    if (totalMonths < 12) return `${totalMonths} мес.`;
    if (totalMonths % 12 === 0) return `${years} год.`;
    return `${years} год. ${totalMonths % 12} мес.`;
  }

  // ── CRUD za aktivnosti ──

  getActivitiesByPet(petId: number): PetActivity[] {
    return this.activities.filter(a => a.petId === petId);
  }

  addActivity(activity: PetActivity): void {
    this.activities.push(activity);
  }

  deleteActivity(id: number): void {
    this.activities = this.activities.filter(a => a.id !== id);
  }

  // ── CRUD za potsetnici ──

  getRemindersByPet(petId: number): PetReminder[] {
    return this.reminders.filter(r => r.petId === petId);
  }

  addReminder(reminder: PetReminder): void {
    this.reminders.push(reminder);
  }

  toggleReminder(id: number): void {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) reminder.completed = !reminder.completed;
  }

  deleteReminder(id: number): void {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }

  // ── Dodavanje tezina vo istorijata ──
  addWeightEntry(petId: number, entry: WeightEntry): void {
    const pet = this.getPetById(petId);
    if (pet) {
      pet.weightHistory.push(entry);
      pet.weight = entry.weight; // azuriranje na trenutnata tezina
    }
  }
}