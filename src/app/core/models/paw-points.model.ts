// Model za PawPoints loyalty sistemot

export interface PawPoints {
  total: number;           // vkupno sobrani poeni
  history: PawPointEntry[];// istorija na transakcii
}

export interface PawPointEntry {
  date: string;            // datum na transakcijata
  points: number;          // + za zaraboteni, - za potroseni
  description: string;     // opis: 'Купено: Royal Canin...'
}