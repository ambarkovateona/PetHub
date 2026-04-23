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

  allListings:      LostFound[] = [];
  filteredListings: LostFound[] = [];

  lostCount:     number = 0;
  foundCount:    number = 0;
  reunitedCount: number = 0;

  searchTerm:      string = '';
  selectedStatus:  string = '';
  selectedPetType: string = '';
  selectedCity:    string = '';

  constructor(private lostFoundService: LostFoundService) {
    this.allListings      = this.lostFoundService.getAllListings();
    this.filteredListings = [...this.allListings];
    this.lostCount        = this.lostFoundService.getLostCount();
    this.foundCount       = this.lostFoundService.getFoundCount();
    this.reunitedCount    = this.lostFoundService.getReunitedCount();
  }

  filterListings(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredListings = this.allListings.filter(l =>
      (
        l.name.toLowerCase().includes(term) ||
        l.description.toLowerCase().includes(term) ||
        l.location.toLowerCase().includes(term) ||
        l.color.toLowerCase().includes(term)
      ) &&
      (this.selectedStatus  === '' || l.status  === this.selectedStatus) &&
      (this.selectedPetType === '' || l.petType === this.selectedPetType) &&
      (this.selectedCity    === '' || l.city    === this.selectedCity)
    );
  }

  resetFilters(): void {
    this.searchTerm      = '';
    this.selectedStatus  = '';
    this.selectedPetType = '';
    this.selectedCity    = '';
    this.filteredListings = [...this.allListings];
  }

  shareListing(event: Event, listing: LostFound): void {
    event.stopPropagation();
    this.lostFoundService.shareListing(listing.id);
    listing.shareCount++;
    const url = `${window.location.origin}/lost-found/${listing.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Линкот е копиран!');
    });
  }

  isNew(date: string): boolean {
    return this.lostFoundService.isNew(date);
  }
}