import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-adoption-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adoption-details.html',
  styleUrl: './adoption-details.css'
})
export class AdoptionDetailsComponent implements OnInit {

  pet: AdoptionPet | undefined;
  isFavorite = false;

  constructor(
    private adoptionService: AdoptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id   = Number(this.route.snapshot.paramMap.get('id'));
    this.pet   = this.adoptionService.getPetById(id);
    if (!this.pet) {
      this.router.navigate(['/adoption']);
      return;
    }
    this.isFavorite = this.adoptionService.getFavorites()
      .some(f => f.id === this.pet!.id);
  }

  toggleFavorite(): void {
    if (!this.pet) return;
    if (this.isFavorite) {
      this.adoptionService.removeFromFavorites(this.pet.id);
    } else {
      this.adoptionService.addToFavorites(this.pet);
    }
    this.isFavorite = !this.isFavorite;
  }
}