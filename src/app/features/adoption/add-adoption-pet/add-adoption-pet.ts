import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';

@Component({
  selector: 'app-add-adoption-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-adoption-pet.html',
  styleUrl: './add-adoption-pet.css'
})
export class AddAdoptionPetComponent {

  submitted = false;

  pet = {
    name:         '',
    breed:        '',
    type:         '',
    gender:       '',
    age:          null as number | null,
    city:         '',
    healthStatus: '',
    vaccinated:   false,
    image:        '',
    description:  ''
  };

  constructor(
    private adoptionService: AdoptionService,
    private router: Router
  ) {}

  isValidUrl(url: string): boolean {
    if (!url) return false;
    try {
      const u = new URL(url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch {
      return false;
    }
  }

  isFormValid(): boolean {
    return !!(
      this.pet.name.trim() &&
      this.pet.breed.trim() &&
      this.pet.type &&
      this.pet.gender &&
      this.pet.age !== null && this.pet.age >= 0 && this.pet.age <= 30 &&
      this.pet.city &&
      this.pet.healthStatus &&
      this.isValidUrl(this.pet.image) &&
      this.pet.description.trim()
    );
  }

  submitPet(): void {
    this.submitted = true;
    if (!this.isFormValid()) return;

    this.adoptionService.addPet({
      id:           Date.now(),
      name:         this.pet.name.trim(),
      breed:        this.pet.breed.trim(),
      type:         this.pet.type as 'Dog' | 'Cat',
      gender:       this.pet.gender as 'Male' | 'Female',
      age:          this.pet.age!,
      city:         this.pet.city,
      healthStatus: this.pet.healthStatus as 'Healthy' | 'NeedsCheckup',
      vaccinated:   this.pet.vaccinated,
      image:        this.pet.image,
      description:  this.pet.description.trim()
    });

    setTimeout(()=>{
        this.router.navigate(['/adoption']);


    },1500);

  }
}