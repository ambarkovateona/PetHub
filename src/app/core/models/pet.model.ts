// Model za osnovnite podatoci na milenicheto

export interface Pet {
  id: number;
  name: string;       // ime na milenicheto
  type: string;       // vid: 'Kuce', 'Machka', itn.
  breed: string;      // rasa
  birthDate: string;  // datum na raganje (ISO string: '2022-03-15')
  gender: string;     // 'Mashko' | 'Zensko'
  image: string;      // URL na slika
  weight: number;     // trenutna tezina vo kg
  weightHistory: WeightEntry[];  // istorija na tezina
}

// Vnos na tezina so datum
export interface WeightEntry {
  date: string;    // koga e izmerena
  weight: number;  // tezina vo kg
}