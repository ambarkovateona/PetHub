import { Injectable } from '@angular/core';
import { AdoptionPet } from '../models/adoption-pet.model';
import { AdoptionApplication } from '../models/adoption-application.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private adoptionPets: AdoptionPet[] = [
    {
      id: 1,
      name: 'Mila',
      type: 'Cat',
      breed: 'Persian',
      age: 2,
      gender: 'Female',
      city: 'Skopje',
      description: 'Friendly and calm cat, good with children.',
      image: 'adoption-pets/mila-persian.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 2,
      name: 'Rex',
      type: 'Dog',
      breed: 'Labrador',
      age: 3,
      gender: 'Male',
      city: 'Bitola',
      description: 'Energetic dog that loves long walks.',
      image: 'adoption-pets/rex-labrador.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 3,
      name: 'Luna',
      type: 'Cat',
      breed: 'Mixed',
      age: 1,
      gender: 'Female',
      city: 'Skopje',
      description: 'Playful young cat looking for a loving home.',
      image: 'adoption-pets/luna-mixed.webp',
      healthStatus: 'Needs checkup',
      vaccinated: false
    },
    {
      id: 4,
      name: 'Bruno',
      type: 'Dog',
      breed: 'German Shepherd',
      age: 4,
      gender: 'Male',
      city: 'Skopje',
      description: 'Loyal and intelligent dog, great for active families. Loves to play fetch and go on long hikes.',
      image: 'adoption-pets/bruno-sheperd.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 5,
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 2,
      gender: 'Female',
      city: 'Ohrid',
      description: 'Sweet and gentle Golden Retriever who loves cuddles and playing with kids.',
      image: 'adoption-pets/bella-retriever.webp',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 6,
      name: 'Oliver',
      type: 'Cat',
      breed: 'British Shorthair',
      age: 3,
      gender: 'Male',
      city: 'Bitola',
      description: 'Calm and independent cat. Prefers a quiet home. Gets along well with other cats.',
      image: 'adoption-pets/oliver-shorthair.webp',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 7,
      name: 'Max',
      type: 'Dog',
      breed: 'Beagle',
      age: 1,
      gender: 'Male',
      city: 'Tetovo',
      description: 'Curious and cheerful puppy, full of energy. Needs a yard and lots of attention.',
      image: 'adoption-pets/max-beagle.webp',
      healthStatus: 'Healthy',
      vaccinated: false
    },
    {
      id: 8,
      name: 'Cleo',
      type: 'Cat',
      breed: 'Siamese',
      age: 5,
      gender: 'Female',
      city: 'Skopje',
      description: 'Elegant and talkative Siamese cat. Very affectionate with her owner, loves being the center of attention.',
      image: 'adoption-pets/cleo-siamese.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 9,
      name: 'Rocky',
      type: 'Dog',
      breed: 'Rottweiler',
      age: 6,
      gender: 'Male',
      city: 'Kumanovo',
      description: 'Big but gentle Rottweiler. Well trained, calm around children. Needs experienced owners.',
      image: 'adoption-pets/rocky-rotweiler.webp',
      healthStatus: 'Needs checkup',
      vaccinated: true
    },
    {
      id: 10,
      name: 'Nala',
      type: 'Cat',
      breed: 'Maine Coon',
      age: 2,
      gender: 'Female',
      city: 'Ohrid',
      description: 'Fluffy Maine Coon with a playful personality. Gets along great with dogs and kids.',
      image: 'adoption-pets/maine-coon.webp',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 11,
      name: 'Zeus',
      type: 'Dog',
      breed: 'Husky',
      age: 3,
      gender: 'Male',
      city: 'Skopje',
      description: 'Stunning Siberian Husky with blue eyes. Very active — needs daily running and mental stimulation.',
      image: 'adoption-pets/zeus-husky.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 12,
      name: 'Daisy',
      type: 'Dog',
      breed: 'Mixed',
      age: 4,
      gender: 'Female',
      city: 'Strumica',
      description: 'Sweet mixed-breed dog rescued from the street. Loves people and is great with other dogs.',
      image: 'adoption-pets/mixed-breed-dog.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 13,
      name: 'Simba',
      type: 'Cat',
      breed: 'Orange Tabby',
      age: 1,
      gender: 'Male',
      city: 'Tetovo',
      description: 'Energetic orange kitten who loves to climb and explore. Very social and purrs constantly.',
      image: 'adoption-pets/orange-tabby-cat.jpg',
      healthStatus: 'Needs checkup',
      vaccinated: false
    },
    {
      id: 14,
      name: 'Lola',
      type: 'Dog',
      breed: 'Poodle',
      age: 2,
      gender: 'Female',
      city: 'Bitola',
      description: 'Intelligent and hypoallergenic Poodle. Perfect for families with allergies. Loves to learn tricks.',
      image: 'adoption-pets/poodle.jpg',
      healthStatus: 'Healthy',
      vaccinated: true
    },
    {
      id: 15,
      name: 'Shadow',
      type: 'Cat',
      breed: 'Black Mixed',
      age: 4,
      gender: 'Male',
      city: 'Skopje',
      description: 'Mysterious black cat with a golden heart. Shy at first, but incredibly loyal once he trusts you.',
      image: 'adoption-pets/black-cat.webp',
      healthStatus: 'Healthy',
      vaccinated: true
    }
  ];

  private favorites: AdoptionPet[] = [];
  private applications: AdoptionApplication[] = [];

  getAllPets(): AdoptionPet[] {
    return this.adoptionPets;
  }

  getPetById(id: number): AdoptionPet | undefined {
    return this.adoptionPets.find(pet => pet.id === id);
  }

  addToFavorites(pet: AdoptionPet): void {
    const exists = this.favorites.some(f => f.id === pet.id);
    if (!exists) {
      this.favorites.push(pet);
    }
  }

  getFavorites(): AdoptionPet[] {
    return this.favorites;
  }

  removeFromFavorites(petId: number): void {
    this.favorites = this.favorites.filter(f => f.id !== petId);
  }

  addPet(pet: AdoptionPet): void {
    this.adoptionPets.push(pet);
  }

  submitApplication(application: AdoptionApplication): void {
    this.applications.push(application);
  }

  getApplications(): AdoptionApplication[] {
    return this.applications;
  }
}