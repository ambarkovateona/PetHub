import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-adoption-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adoption-details.html',
  styleUrl: './adoption-details.css'
})
export class AdoptionDetailsComponent {
  pet?: AdoptionPet;
  isSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adoptionService: AdoptionService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.adoptionService.getPetById(id);

    // Check if already in favorites on load
    if (this.pet) {
      this.isSaved = this.adoptionService.getFavorites()
        .some(f => f.id === this.pet!.id);
    }
  }

  addToFavorites(): void {
    if (this.pet && !this.isSaved) {
      this.adoptionService.addToFavorites(this.pet);
      this.isSaved = true;
    }
  }
}