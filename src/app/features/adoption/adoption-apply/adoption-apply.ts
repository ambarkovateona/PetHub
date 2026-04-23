import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AdoptionService } from '../../../core/services/adoption';
import { AdoptionPet } from '../../../core/models/adoption-pet.model';

@Component({
  selector: 'app-adoption-apply',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adoption-apply.html',
  styleUrl: './adoption-apply.css'
})
export class AdoptionApplyComponent implements OnInit {

  pet: AdoptionPet | undefined;
  submitted    = false;
  formSubmitted = false;

  application = {
    fullName:   '',
    city:       '',
    email:      '',
    phone:      '',
    experience: '',
    message:    ''
  };

  constructor(
    private adoptionService: AdoptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet  = this.adoptionService.getPetById(id);
    if (!this.pet) {
      this.router.navigate(['/adoption']);
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone: string): boolean {
    if (!phone) return false;
    return /^[0-9+\s\-()]{7,15}$/.test(phone.trim());
  }

  isFormValid(): boolean {
    return !!(
      this.application.fullName.trim() &&
      this.application.city &&
      this.isValidEmail(this.application.email) &&
      this.isValidPhone(this.application.phone)
    );
  }

  submitApplication(): void {
    this.formSubmitted = true;
    if (!this.isFormValid()) return;
    this.submitted = true;
  }
}