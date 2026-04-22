// Model za proizvod vo koshnickata

import { Product } from './product.model';

export interface CartItem {
  product: Product;    // celiot proizvod
  quantity: number;    // kolicina
}