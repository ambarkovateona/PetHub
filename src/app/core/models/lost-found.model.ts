// Model za izgubeno/najdeno mileniче

export interface LostFound {
  id: number;
  status: 'Изгубено' | 'Најдено' | 'Воссоединето';
  petType: string;        // 'Куче' | 'Мачка' | 'Птица' | 'Друго'
  name: string;           // ime ako e poznato, '' ako ne e
  breed: string;          // rasa
  color: string;          // boja / opis na izgled
  description: string;    // detalen opis
  image: string;          // URL na slika
  location: string;       // lokacija kade e videno
  city: string;           // grad
  date: string;           // datum na gubenje/naoganje (ISO string)
  contactName: string;    // ime na kontakt lice
  contactPhone: string;   // telefon
  contactEmail: string;   // email (opcionalno)
  urgent: boolean;        // dali e urgentno (poveke od 7 dena)
  shareCount: number;     // kolku pati e spodeleno
}