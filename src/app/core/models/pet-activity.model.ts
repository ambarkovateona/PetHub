// Model za aktivnostite na milenicheto (proshetki, igra, hranewe)

export interface PetActivity {
  id: number;
  petId: number;       // na koj mileniче mu pripagja aktivnosta
  type: string;        // 'Proshetka' | 'Igra' | 'Hranewe'
  date: string;        // datum i vreme (ISO string)
  duration: number;    // trajanje vo minuti (za proshetka i igra)
  notes: string;       // dodatni beleshki
}