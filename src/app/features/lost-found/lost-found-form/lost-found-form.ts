// Forma za prijavuvanje izgubeno ili najdeno mileniче

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LostFoundService } from '../../../core/services/lost-found';
import { LostFound } from '../../../core/models/lost-found.model';

@Component({
  selector: 'app-lost-found-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lost-found-form.html',
  styleUrl: './lost-found-form.css'
})
export class LostFoundFormComponent {
  submitted=false
  // Podatoci od formata
  listing: LostFound = {
    id: 0,
    status: 'Изгубено',
    petType: '',
    name: '',
    breed: '',
    color: '',
    description: '',
    image: '',
    location: '',
    city: '',
    date: new Date().toISOString().split('T')[0],
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    urgent: false,
    shareCount: 0
  };

  constructor(
    private lostFoundService: LostFoundService,
    private router: Router
  ) {}

  // Zacuvuva ogласот i vrakа na listata
  submitListing(): void {
    this.listing.id = Date.now();
    this.lostFoundService.addListing({ ...this.listing });

    this.submitted=true;
    setTimeout(()=>{
          this.router.navigate(['/lost-found']);

    },2800);
    
  }

  onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    this.listing.image = URL.createObjectURL(file);
  }
}

  // Resetira formata
  resetForm(): void {
    this.listing = {
      id: 0,
      status: 'Изгубено',
      petType: '',
      name: '',
      breed: '',
      color: '',
      description: '',
      image: '',
      location: '',
      city: '',
      date: new Date().toISOString().split('T')[0],
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      urgent: false,
      shareCount: 0
    };
  }
  setStatus(val : string):void{
    this.listing.status = val === 'izgubeno' ? 'Изгубено' : 'Најдено';
  }
  ngOnInit() {
  this.submitted = false;
  }

  cancel(): void {
    this.router.navigate(['/lost-found']);
  }
}