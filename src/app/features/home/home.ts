import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdoptionService } from '../../core/services/adoption';
import { LostFoundService } from '../../core/services/lost-found';
import { ShopService } from '../../core/services/shop';
import { AdoptionPet } from '../../core/models/adoption-pet.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  featuredPets: AdoptionPet[] = [];
  totalPets:     number = 0;
  reunitedCount: number = 0;
  totalProducts: number = 0;
  lostCount:     number = 0;

  constructor(
    private adoptionService:  AdoptionService,
    private lostFoundService: LostFoundService,
    private shopService:      ShopService
  ) {}

  ngOnInit(): void {
    this.featuredPets  = this.adoptionService.getAllPets().slice(0, 3);
    this.totalPets     = this.adoptionService.getAllPets().length;
    this.lostCount     = this.lostFoundService.getLostCount?.() ?? 3;
    this.reunitedCount = (this.lostFoundService.getReunitedCount?.() ?? 0) + 23;
    this.totalProducts = this.shopService.getAllProducts().length;
  }
}