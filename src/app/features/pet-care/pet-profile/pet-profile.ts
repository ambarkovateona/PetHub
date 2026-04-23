import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { PetCareService } from '../../../core/services/pet-care';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pet-profile.html',
  styleUrl: './pet-profile.css'
})
export class PetProfileComponent implements OnInit {

  isEditMode = false;
  submitted  = false;
  today      = new Date().toISOString().split('T')[0];

  pet: Partial<Pet> = {
    name:      '',
    type:      '',
    breed:     '',
    gender:    '',
    birthDate: '',
    weight:    undefined,
    image:     ''
  };

  constructor(
    private petCareService: PetCareService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'add') {
      this.isEditMode = true;
      const existing  = this.petCareService.getPetById(Number(id));
      if (existing) {
        this.pet = { ...existing };
      } else {
        this.router.navigate(['/pet-care']);
      }
    }
  }

  isFormValid(): boolean {
    return !!(
      this.pet.name?.trim() &&
      this.pet.type &&
      this.pet.breed?.trim() &&
      this.pet.gender &&
      this.pet.birthDate &&
      this.pet.weight && this.pet.weight > 0
    );
  }

  savePet(): void {
    this.submitted = true;
    if (!this.isFormValid()) return;

    if (this.isEditMode && this.pet.id) {
      this.petCareService.updatePet(this.pet as Pet);
    } else {
      this.petCareService.addPet({
        id:        Date.now(),
        name:      this.pet.name!.trim(),
        type:      this.pet.type!,
        breed:     this.pet.breed!.trim(),
        gender:    this.pet.gender!,
        birthDate: this.pet.birthDate!,
        weight:    this.pet.weight!,
        image:     this.pet.image || ''
      } as Pet);
    }

    this.router.navigate(['/pet-care']);
  }

  cancel(): void {
    this.router.navigate(['/pet-care']);
  }
}