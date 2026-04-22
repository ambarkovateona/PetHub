// Glavna stranica za lost and found - lista na oglasi so filtri

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LostFoundService } from '../../../core/services/lost-found';
import { LostFound } from '../../../core/models/lost-found.model';

@Component({
  selector: 'app-lost-found-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lost-found-list.html',
  styleUrl: './lost-found-list.css'
})
export class LostFoundListComponent {
  allListings: LostFound[] = [];
  filteredListings: LostFound[] = [];

  // Statistika za headerot
  lostCount: number = 0;
  foundCount: number = 0;
  reunitedCount: number = 0;

  // Filtri
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedPetType: string = '';
  selectedCity: string = '';

  constructor(private lostFoundService: LostFoundService) {
    this.allListings = this.lostFoundService.getAllListings();
    this.filteredListings = [...this.allListings];
    this.lostCount = this.lostFoundService.getLostCount();
    this.foundCount = this.lostFoundService.getFoundCount();
    this.reunitedCount = this.lostFoundService.getReunitedCount();
  }

  // Filtriranje
  filterListings(): void {
    this.filteredListings = this.allListings.filter(l =>
      (l.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       l.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       l.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       l.color.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedStatus === '' || l.status === this.selectedStatus) &&
      (this.selectedPetType === '' || l.petType === this.selectedPetType) &&
      (this.selectedCity === '' || l.city === this.selectedCity)
    );
  }

  // Reset na filtri
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedPetType = '';
    this.selectedCity = '';
    this.filteredListings = [...this.allListings];
  }

  // Spodeluvanje na oglas
  shareListing(event: Event, listing: LostFound): void {
    event.stopPropagation();
    this.lostFoundService.shareListing(listing.id);
    listing.shareCount++;
    // Kopira link vo clipboard
    const url = `${window.location.origin}/lost-found/${listing.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Линкот е копиран!');
    });
  }

  // Ikona spored tip
  getPetIcon(type: string): string {
    if (type === 'Куче') return '🐶';
    if (type === 'Мачка') return '🐱';
    if (type === 'Птица') return '🐦';
    return '🐾';
  }

  // Ikona i boja spored status
  getStatusIcon(status: string): string {
    if (status === 'Изгубено') return '💔';
    if (status === 'Најдено') return '🔍';
    return '🎉';
  }

  // Dali ogласот e nov
  isNew(date: string): boolean {
    return this.lostFoundService.isNew(date);
  }
}