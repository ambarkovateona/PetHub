export interface LostFound {
  id:           number;
  status:       'Изгубено' | 'Најдено' | 'Успешно поврзани';
  petType:      string;
  name:         string;
  breed:        string;
  color:        string;
  description:  string;
  image:        string;
  location:     string;
  city:         string;
  date:         string;
  contactName:  string;
  contactPhone: string;
  contactEmail: string;
  urgent:       boolean;
  shareCount:   number;
}