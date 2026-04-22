// Servis za lost and found - upravuva so oglasi za izgubeni/najdeni mileniinja

import { Injectable } from '@angular/core';
import { LostFound } from '../models/lost-found.model';

@Injectable({
  providedIn: 'root'
})
export class LostFoundService {

  // ── Testni podatoci ──
  private listings: LostFound[] = [
    {
      id: 1,
      status: 'Изгубено',
      petType: 'Куче',
      name: 'Мекси',
      breed: 'Лабрадор',
      color: 'Жолта',
      description: 'Пријателско куче, носи sina огрлица. Последно видено кај Градски парк. Многу питомо, одговара на своето име.',
      image: 'https://placedog.net/400/300',
      location: 'Градски Парк',
      city: 'Скопје',
      date: '2025-04-15',
      contactName: 'Ана Петровска',
      contactPhone: '070 123 456',
      contactEmail: 'ana@email.com',
      urgent: true,
      shareCount: 24
    },
    {
      id: 2,
      status: 'Најдено',
      petType: 'Мачка',
      name: '',
      breed: 'Непознато',
      color: 'Сива со бели шари',
      description: 'Пронајдена мачка кај Бунјаковец, изгледа добро негувана. Има огрлица без таг. Привремено сместена кај нас.',
      image: 'https://placekitten.com/400/300',
      location: 'Бунјаковец',
      city: 'Скопје',
      date: '2025-04-18',
      contactName: 'Марко Јовески',
      contactPhone: '071 987 654',
      contactEmail: '',
      urgent: false,
      shareCount: 12
    },
    {
      id: 3,
      status: 'Изгубено',
      petType: 'Куче',
      name: 'Роки',
      breed: 'Германски овчар',
      color: 'Кафеав и црн',
      description: 'Голем пас, многу питом. Побегнал при громотевица. Носи сина огрлица со таг. Наградa за наоѓач.',
      image: 'https://placedog.net/401/300',
      location: 'Аеродром',
      city: 'Скопје',
      date: '2025-04-20',
      contactName: 'Петар Николов',
      contactPhone: '072 555 333',
      contactEmail: 'petar@email.com',
      urgent: false,
      shareCount: 45
    },
    {
      id: 4,
      status: 'Воссоединето',
      petType: 'Мачка',
      name: 'Луна',
      breed: 'Персиска',
      color: 'Бела',
      description: 'Луна се врати дома по 5 дена! Благодарение на сите кои помогнаа во пребарувањето.',
      image: 'https://placekitten.com/401/300',
      location: 'Центар',
      city: 'Скопје',
      date: '2025-04-10',
      contactName: 'Марија Стојанова',
      contactPhone: '075 222 111',
      contactEmail: '',
      urgent: false,
      shareCount: 67
    },
    {
      id: 5,
      status: 'Изгубено',
      petType: 'Куче',
      name: 'Буди',
      breed: 'Мешанец',
      color: 'Кафеав со бела дамка',
      description: 'Мал пес, многу игрив. Изгубен во близина на пазарот. Многу сакан член на семејството.',
      image: 'https://placedog.net/402/300',
      location: 'Пазар',
      city: 'Битола',
      date: '2025-04-19',
      contactName: 'Сара Димова',
      contactPhone: '078 444 222',
      contactEmail: 'sara@email.com',
      urgent: false,
      shareCount: 8
    },
    {
      id: 6,
      status: 'Најдено',
      petType: 'Птица',
      name: '',
      breed: 'Папагал',
      color: 'Зелена со жолта глава',
      description: 'Пронајден папагал во дворот. Зборува неколку зборови. Очигледно питомо животно кое некому му недостасува.',
      image: 'https://placehold.co/400x300/7A9E7E/FFFFFF?text=🦜',
      location: 'Карпош',
      city: 'Скопје',
      date: '2025-04-21',
      contactName: 'Јована Ристова',
      contactPhone: '071 333 999',
      contactEmail: 'jovana@email.com',
      urgent: false,
      shareCount: 31
    }
  ];

  // ── Getteri ──

  getAllListings(): LostFound[] {
    return this.listings;
  }

  getListingById(id: number): LostFound | undefined {
    return this.listings.find(l => l.id === id);
  }

  // Statistika za headerot
  getLostCount(): number {
    return this.listings.filter(l => l.status === 'Изгубено').length;
  }

  getFoundCount(): number {
    return this.listings.filter(l => l.status === 'Најдено').length;
  }

  getReunitedCount(): number {
    return this.listings.filter(l => l.status === 'Воссоединето').length;
  }

  // Dodavanje nov oglas
  addListing(listing: LostFound): void {
    listing.id = Date.now();
    // Proveruva dali e urgentno (poveke od 7 dena)
    const days = this.getDaysSince(listing.date);
    listing.urgent = days > 7;
    this.listings.unshift(listing); // go dodava na pocetok
  }

  // Spodeluvanje - go zgolemuva brojacot
  shareListing(id: number): void {
    const listing = this.getListingById(id);
    if (listing) listing.shareCount++;
  }

  // Presmetuva kolku dena izminale
  getDaysSince(date: string): number {
    const diff = new Date().getTime() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Azurira status na oglas
  updateStatus(id: number, status: 'Изгубено' | 'Најдено' | 'Воссоединето'): void {
    const listing = this.getListingById(id);
    if (listing) listing.status = status;
  }

  // Proveruva dali ogласот e nov (pomal od 24 casa)
  isNew(date: string): boolean {
    const d = new Date(date);
    const now = new Date();
    const hours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
    return hours < 24;
  }
}