import { Injectable } from '@angular/core';
import { AdoptionPet } from '../models/adoption-pet.model';
import { AdoptionApplication } from '../models/adoption-application.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private adoptionPets: AdoptionPet[] = [
    {
      "id": 1,
      "name": "Мила",
      "type": "Cat",
      "breed": "Персиска",
      "age": 2,
      "gender": "Female",
      "city": "Skopje",
      "description": "Дружељубива и смирена мачка, се разбира со деца.",
      "image": "adoption-pets/mila-persian.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 2,
      "name": "Рекс",
      "type": "Dog",
      "breed": "Лабрадор",
      "age": 3,
      "gender": "Male",
      "city": "Bitola",
      "description": "Енергично куче кое обожува долги прошетки.",
      "image": "adoption-pets/rex-labrador.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 3,
      "name": "Луна",
      "type": "Cat",
      "breed": "Мешана раса",
      "age": 1,
      "gender": "Female",
      "city": "Skopje",
      "description": "Игрива млада мачка која бара љубовен дом.",
      "image": "adoption-pets/luna-mixed.webp",
      "healthStatus": "Needs checkup",
      "vaccinated": false
    },
    {
      "id": 4,
      "name": "Бруно",
      "type": "Dog",
      "breed": "Германски овчар",
      "age": 4,
      "gender": "Male",
      "city": "Skopje",
      "description": "Лојален и интелигентен пес, одличен за активни семејства. Обожува да игра и да оди на прошетки.",
      "image": "adoption-pets/bruno-sheperd.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 5,
      "name": "Бела",
      "type": "Dog",
      "breed": "Златен ретривер",
      "age": 2,
      "gender": "Female",
      "city": "Ohrid",
      "description": "Нежна и мила кучка која обожува прегратки и игра со деца.",
      "image": "adoption-pets/bella-retriever.webp",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 6,
      "name": "Оливер",
      "type": "Cat",
      "breed": "Британска кратка",
      "age": 3,
      "gender": "Male",
      "city": "Bitola",
      "description": "Мирен и независен маче. Претпочита тивок дом. Се разбира со други мачки.",
      "image": "adoption-pets/oliver-shorthair.webp",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 7,
      "name": "Макс",
      "type": "Dog",
      "breed": "Бигл",
      "age": 1,
      "gender": "Male",
      "city": "Tetovo",
      "description": "Љубопитно и весело кученце, полно со енергија. Потребен двор и многу внимание.",
      "image": "adoption-pets/max-beagle.webp",
      "healthStatus": "Healthy",
      "vaccinated": false
    },
    {
      "id": 8,
      "name": "Клео",
      "type": "Cat",
      "breed": "Сијамска",
      "age": 5,
      "gender": "Female",
      "city": "Skopje",
      "description": "Елегантна и зборлива сијамска мачка. Многу нежна со сопственикот.",
      "image": "adoption-pets/cleo-siamese.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 9,
      "name": "Роки",
      "type": "Dog",
      "breed": "Ротвајлер",
      "age": 6,
      "gender": "Male",
      "city": "Kumanovo",
      "description": "Голем но нежен ротвајлер. Добро обучен, мирен со деца. Потребни искусни сопственици.",
      "image": "adoption-pets/rocky-rotweiler.webp",
      "healthStatus": "Needs checkup",
      "vaccinated": true
    },
    {
      "id": 10,
      "name": "Нала",
      "type": "Cat",
      "breed": "Мејн Кун",
      "age": 2,
      "gender": "Female",
      "city": "Ohrid",
      "description": "Пухкава мачка со игрива личност. Се разбира одлично со кучиња и деца.",
      "image": "adoption-pets/maine-coon.webp",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 11,
      "name": "Зевс",
      "type": "Dog",
      "breed": "Хаски",
      "age": 3,
      "gender": "Male",
      "city": "Skopje",
      "description": "Прекрасен сибирски хаски со сини очи. Многу активен — потребно секојдневно трчање.",
      "image": "adoption-pets/zeus-husky.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 12,
      "name": "Дејзи",
      "type": "Dog",
      "breed": "Мешана раса",
      "age": 4,
      "gender": "Female",
      "city": "Strumica",
      "description": "Мила мешана кучка спасена од улица. Ги сака луѓето и се разбира со други кучиња.",
      "image": "adoption-pets/mixed-breed-dog.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    },
    {
      "id": 13,
      "name": "Симба",
      "type": "Cat",
      "breed": "Портокалова таби",
      "age": 1,
      "gender": "Male",
      "city": "Tetovo",
      "description": "Енергично портокалово маче кое сака да се качува и истражува. Многу социјално.",
      "image": "adoption-pets/orange-tabby-cat.jpg",
      "healthStatus": "Needs checkup",
      "vaccinated": false
    },
    {
      "id": 14,
      "name": "Лола",
      "type": "Dog",
      "breed": "Пудла",
      "age": 2,
      "gender": "Female",
      "city": "Bitola",
      "description": "Интелигентна и хипоалергена пудла. Совршена за семејства со алергии. Обожува да учи трикови.",
      "image": "adoption-pets/poodle.jpg",
      "healthStatus": "Healthy",
      "vaccinated": true
    
    },
    {
      "id": 15,
      "name": "Сенка",
      "type": "Cat",
      "breed": "Црна мешана",
      "age": 4,
      "gender": "Male",
      "city": "Skopje",
      "description": "Мистериозна црна мачка со златно срце. Срамежлива на почеток, но невероватно лојална.",
      "image": "adoption-pets/black-cat.webp",
      "healthStatus": "Healthy",
      "vaccinated": true,
     
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