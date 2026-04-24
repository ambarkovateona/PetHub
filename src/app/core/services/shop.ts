// Glavni servis za shopot - proizvodi, koshnicka i PawPoints

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { PawPoints } from '../models/paw-points.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // ── Cart count observable ──
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // ── Testni proizvodi ──
  private products: Product[] = [
    {
      id: 1,
      name: 'Royal Canin Medium Adult',
      category: 'Храна за кучиња',
      petType: ['Куче'],
      price: 2499,
      image: "shop/51Ro8SkLgNL._AC_UF1000,1000_QL80_.jpg",
      description: 'Комплетна храна за возрасни кучиња од средна раса. Содржи оптимален баланс на протеини и влакна.',
      brand: 'Royal Canin',
      weight: '4kg',
      vetApproved: true,
      inStock: true,
      rating: 4.8,
      reviewCount: 124,
      ageGroup: ['Возрасно'],
      breedSize: ['Средно'],
      pawPoints: 25
    },
    {
      id: 2,
      name: 'Royal Canin Maxi Adult',
      category: 'Храна за кучиња',
      petType: ['Куче'],
      price: 3299,
      image: "shop/51Ro8SkLgNL._AC_UF1000,1000_QL80_.jpg",
      description: 'Храна специјално формулирана за големи раси. Поддржува здрави зглобови и мускули.',
      brand: 'Royal Canin',
      weight: '10kg',
      vetApproved: true,
      inStock: true,
      rating: 4.7,
      reviewCount: 89,
      ageGroup: ['Возрасно'],
      breedSize: ['Големо'],
      pawPoints: 33
    },
    {
      id: 3,
      name: 'Purina Pro Plan Puppy',
      category: 'Храна за кучиња',
      petType: ['Куче'],
      price: 1899,
      image: "shop/001.webp",
      description: 'Специјална формула за штенци. Богата со DHA за развој на мозокот и имунитетот.',
      brand: 'Purina',
      weight: '3kg',
      vetApproved: true,
      inStock: true,
      rating: 4.9,
      reviewCount: 203,
      ageGroup: ['Младо'],
      breedSize: ['Сите'],
      pawPoints: 19
    },
    {
      id: 4,
      name: 'Hills Science Diet Senior',
      category: 'Храна за кучиња',
      petType: ['Куче'],
      price: 2799,
      image: "shop/2526058.webp",
      description: 'Формулирана за постари кучиња над 7 години. Поддржува здраво срце и бубрези.',
      brand: 'Hills',
      weight: '6kg',
      vetApproved: true,
      inStock: true,
      rating: 4.6,
      reviewCount: 67,
      ageGroup: ['Старо'],
      breedSize: ['Сите'],
      pawPoints: 28
    },
    {
      id: 5,
      name: 'Royal Canin Persian Adult',
      category: 'Храна за мачки',
      petType: ['Мачка'],
      price: 1699,
      image: "shop/51Ro8SkLgNL._AC_UF1000,1000_QL80_.jpg",
      description: 'Специјално формулирана за Персиски мачки. Поддржува здрава кожа и крзно.',
      brand: 'Royal Canin',
      weight: '2kg',
      vetApproved: true,
      inStock: true,
      rating: 4.7,
      reviewCount: 91,
      ageGroup: ['Возрасно'],
      breedSize: ['Сите'],
      pawPoints: 17
    },
    {
      id: 6,
      name: 'Whiskas Adult Chicken',
      category: 'Храна за мачки',
      petType: ['Мачка'],
      price: 899,
      image: "shop/viskas-adolt.jpg",
      description: 'Вкусна влажна храна со пилешко за возрасни мачки. Богата со протеини и таурин.',
      brand: 'Whiskas',
      weight: '400g',
      vetApproved: false,
      inStock: true,
      rating: 4.3,
      reviewCount: 156,
      ageGroup: ['Возрасно'],
      breedSize: ['Сите'],
      pawPoints: 9
    },
    {
      id: 7,
      name: 'Purina One Kitten',
      category: 'Храна за мачки',
      petType: ['Мачка'],
      price: 1299,
      image: "shop/viskas-adolt.jpg",
      description: 'Комплетна исхрана за мачиња до 1 година. Содржи DHA за развој на мозокот.',
      brand: 'Purina',
      weight: '1.5kg',
      vetApproved: true,
      inStock: true,
      rating: 4.8,
      reviewCount: 112,
      ageGroup: ['Младо'],
      breedSize: ['Сите'],
      pawPoints: 13
    },
    {
      id: 8,
      name: 'Kong Classic Играчка',
      category: 'Играчки',
      petType: ['Куче'],
      price: 799,
      image: "shop/001.webp",
      description: 'Класична гумена играчка за кучиња. Може да се полни со посластици. Издржлива и безбедна.',
      brand: 'Kong',
      weight: '',
      vetApproved: false,
      inStock: true,
      rating: 4.9,
      reviewCount: 341,
      ageGroup: ['Сите'],
      breedSize: ['Средно'],
      pawPoints: 8
    },
    {
      id: 9,
      name: 'Интерактивна играчка за мачки',
      category: 'Играчки',
      petType: ['Мачка'],
      price: 599,
      image:  "shop/2526058.webp",
      description: 'Електронска играчка со пердуви и ласер. Ја стимулира природниот инстинкт за лов.',
      brand: 'PetPlay',
      weight: '',
      vetApproved: false,
      inStock: true,
      rating: 4.5,
      reviewCount: 78,
      ageGroup: ['Сите'],
      breedSize: ['Сите'],
      pawPoints: 6
    },
    {
      id: 10,
      name: 'Био Шампон за кучиња',
      category: 'Шампони',
      petType: ['Куче'],
      price: 699,
      image: "shop/41j0fqrQrjL.jpg",
      description: 'Природен шампон без парабени. Нежна формула за чувствителна кожа. Пријатен мирис.',
      brand: 'BioPet',
      weight: '250ml',
      vetApproved: true,
      inStock: true,
      rating: 4.6,
      reviewCount: 55,
      ageGroup: ['Сите'],
      breedSize: ['Сите'],
      pawPoints: 7
    },
    {
      id: 11,
      name: 'Ортопедско Легло XL',
      category: 'Легла',
      petType: ['Куче'],
      price: 3499,
      image: "shop/DN-ND-BB2.webp",
      description: 'Меморија пена легло за кучиња. Идеално за постари кучиња со проблеми со зглобовите.',
      brand: 'ComfortPet',
      weight: '',
      vetApproved: true,
      inStock: true,
      rating: 4.7,
      reviewCount: 43,
      ageGroup: ['Старо'],
      breedSize: ['Големо'],
      pawPoints: 35
    },
    {
      id: 12,
      name: 'Омега 3 Суплемент',
      category: 'Суплементи',
      petType: ['Куче', 'Мачка'],
      price: 1199,
      image: "shop/Omega3Pet_SG_L_2000x2000_25adb486-8f0c-46bf-ba32-8a0d5493c26e.webp",
      description: 'Природен Омега 3 додаток за здрава кожа, крзно и зглобови. За кучиња и мачки.',
      brand: 'VetCare',
      weight: '100 капсули',
      vetApproved: true,
      inStock: true,
      rating: 4.8,
      reviewCount: 167,
      ageGroup: ['Сите'],
      breedSize: ['Сите'],
      pawPoints: 12
    }
  ];

  // ── Koshnicka ──
  private cart: CartItem[] = [];

  // ── PawPoints ──
  private pawPoints: PawPoints = {
    total: 150,
    history: [
      {
        date: '2025-04-01',
        points: 150,
        description: 'Добредојде бонус'
      }
    ]
  };

  // ── Azurira cart count subject ──
  private updateCartCount(): void {
    const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(total);
  }

  // ── CRUD za proizvodi ──
  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getRecommendedProducts(petType: string, ageGroup: string, breedSize: string): Product[] {
    return this.products.filter(p =>
      p.petType.includes(petType) &&
      (p.ageGroup.includes(ageGroup) || p.ageGroup.includes('Сите')) &&
      (p.breedSize.includes(breedSize) || p.breedSize.includes('Сите'))
    ).slice(0, 4);
  }

  // ── Koshnicka ──
  getCart(): CartItem[] {
    return this.cart;
  }

  getCartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    const existing = this.cart.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.updateCartCount();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(i => i.product.id !== productId);
    this.updateCartCount();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(i => i.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
    this.updateCartCount();
  }

  // ── PawPoints ──
  getPawPoints(): PawPoints {
    return this.pawPoints;
  }

  addPawPoints(points: number, description: string): void {
    this.pawPoints.total += points;
    this.pawPoints.history.push({
      date: new Date().toISOString().split('T')[0],
      points,
      description
    });
  }

  redeemPawPoints(points: number): boolean {
    if (this.pawPoints.total >= points) {
      this.pawPoints.total -= points;
      this.pawPoints.history.push({
        date: new Date().toISOString().split('T')[0],
        points: -points,
        description: 'Искористени поени за попуст'
      });
      return true;
    }
    return false;
  }

  checkout(): number {
    const totalPoints = this.cart.reduce(
      (sum, item) => sum + item.product.pawPoints * item.quantity, 0
    );
    const productNames = this.cart.map(i => i.product.name).join(', ');
    this.addPawPoints(totalPoints, `Купено: ${productNames}`);
    this.cart = [];
    this.updateCartCount();
    return totalPoints;
  }
}