import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';

@Component({
  selector: 'app-add-adoption-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-adoption-pet.html',
  styleUrl: './add-adoption-pet.css'
})
export class AddAdoptionPetComponent {
  addPetForm;
  submitted: boolean = false;   // replaces alert()
  imagePreview: string = '';     // live image preview

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adoptionService: AdoptionService
  ) {
    this.addPetForm = this.fb.group({
      name:         ['', Validators.required],
      type:         ['', Validators.required],
      breed:        ['', Validators.required],
      age:          ['', Validators.required],
      gender:       ['', Validators.required],
      city:         ['', Validators.required],
      description:  ['', Validators.required],
      image:        ['', Validators.required],
      healthStatus: ['', Validators.required],
      vaccinated:   [false]
    });
  }

  /** Toggle the vaccinated boolean field */
  toggleVaccinated(): void {
    const current = this.addPetForm.get('vaccinated')?.value;
    this.addPetForm.patchValue({ vaccinated: !current });
  }

  /** Update live image preview as user types */
  onImageInput(): void {
    const url = this.addPetForm.get('image')?.value ?? '';
    this.imagePreview = url;
  }

  onSubmit(): void {
    if (this.addPetForm.valid) {
      this.adoptionService.addPet({
        id:           Date.now(),
        name:         this.addPetForm.value.name         ?? '',
        type:         this.addPetForm.value.type         ?? '',
        breed:        this.addPetForm.value.breed        ?? '',
        age:          Number(this.addPetForm.value.age   ?? 0),
        gender:       this.addPetForm.value.gender       ?? '',
        city:         this.addPetForm.value.city         ?? '',
        description:  this.addPetForm.value.description  ?? '',
        image:        this.addPetForm.value.image        ?? '',
        healthStatus: this.addPetForm.value.healthStatus ?? '',
        vaccinated:   this.addPetForm.value.vaccinated   ?? false
      });

      this.submitted = true;    // show success state, no alert()
      this.imagePreview = '';
      this.addPetForm.reset({ vaccinated: false });

      // Auto-navigate after 3s
      setTimeout(() => this.router.navigate(['/adoption']), 3000);

    } else {
      this.addPetForm.markAllAsTouched();
    }
  }
}