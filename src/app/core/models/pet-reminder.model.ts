// Model za potsetnici (vakcinacii, pregledi, hranewe)

export interface PetReminder {
  id: number;
  petId: number;        // na koj mileniче mu pripagja potsетnikot
  type: string;         // 'Vakcinacija' | 'Pregled' | 'Hranewe' | 'Drugo'
  title: string;        // naslov na potsетnikot
  date: string;         // datum koga treba da se izvrshi (ISO string)
  completed: boolean;   // dali e izvrshen
  notes: string;        // dodatni beleshki
}