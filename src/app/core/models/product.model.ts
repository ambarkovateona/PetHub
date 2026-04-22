// Model za proizvod vo shopot

export interface Product {
  id: number;
  name: string;           // ime na proizvodot
  category: string;       // 'Храна за кучиња' | 'Храна за мачки' | 'Играчки' | 'Шампони' | 'Легла' | 'Суплементи'
  petType: string[];      // ['Куче'] | ['Мачка'] | ['Куче', 'Мачка'] itn.
  price: number;          // cena vo denari
  image: string;          // URL na slika
  description: string;    // opis na proizvodot
  brand: string;          // brend
  weight: string;         // '1kg' | '5kg' | '' za igricki
  vetApproved: boolean;   // dali e preporacano od veterinar
  inStock: boolean;       // dali ima na zalixba
  rating: number;         // ocena od 1-5
  reviewCount: number;    // broj na recenzii
  ageGroup: string[];     // ['Младо'] | ['Возрасно'] | ['Старо'] | ['Сите']
  breedSize: string[];    // ['Мало'] | ['Средно'] | ['Големо'] | ['Сите']
  pawPoints: number;      // kolku PawPoints se dobivaat pri kupuvanje
}