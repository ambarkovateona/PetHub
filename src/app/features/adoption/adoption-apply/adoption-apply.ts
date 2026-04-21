import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-adoption-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './adoption-apply.html',
  styleUrl: './adoption-apply.css'
})
export class AdoptionApplyComponent {
  petId: number = 0;
  pet?: AdoptionPet;          // loaded for sidebar display
  submitted: boolean = false; // replaces alert()

  applicationForm;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adoptionService: AdoptionService
  ) {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.adoptionService.getPetById(this.petId); // load pet for sidebar

    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      phone:    ['', Validators.required],
      city:     ['', Validators.required],
      message:  ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.adoptionService.submitApplication({
        id: Date.now(),
        petId: this.petId,
        fullName: this.applicationForm.value.fullName ?? '',
        email:    this.applicationForm.value.email    ?? '',
        phone:    this.applicationForm.value.phone    ?? '',
        city:     this.applicationForm.value.city     ?? '',
        message:  this.applicationForm.value.message  ?? ''
      });

      this.submitted = true;           // show success state in UI
      this.applicationForm.reset();

      // Navigate back after 3 seconds
      setTimeout(() => this.router.navigate(['/adoption']), 3000);

    } else {
      this.applicationForm.markAllAsTouched();
    }
  }
}