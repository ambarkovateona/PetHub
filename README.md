# PetHub

PetHub is a full-stack-ready Angular web application for pet care management, built with modern Angular 17+ standalone architecture and server-side rendering support.

---

## Tech Stack

- **Angular 17+** — Standalone components, SSR enabled
- **TypeScript** — Strict typing throughout
- **Tailwind CSS** — Utility-first styling
- **RxJS** — Reactive state management with BehaviorSubject
- **Google Fonts** — Inter (sans-serif) + Lora (display)

---

## Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | HomeComponent | — |
| `/login` | LoginComponent | — |
| `/adoption` | AdoptionListComponent | — |
| `/adoption/add` | AddAdoptionPetComponent | — |
| `/adoption/:id` | AdoptionDetailsComponent | — |
| `/adoption/:id/apply` | AdoptionApplyComponent | — |
| `/favorites` | FavoritesComponent | — |
| `/pet-care` | PetDashboardComponent | Auth |
| `/pet-care/profile/add` | PetProfileComponent | Auth |
| `/pet-care/profile/:id` | PetProfileComponent | Auth |
| `/pet-care/activities/:id` | PetActivitiesComponent | Auth |
| `/pet-care/reminders/:id` | PetRemindersComponent | Auth |
| `/shop` | ShopListComponent | — |
| `/shop/cart` | CartComponent | — |
| `/shop/:id` | ShopDetailsComponent | — |
| `/lost-found` | LostFoundListComponent | — |
| `/lost-found/add` | LostFoundFormComponent | — |

---

## Features

### Adoption
Browse available pets with filtering by type, gender, city and health status. Submit adoption applications and save favourites. Authenticated users can list pets for adoption.

### Pet Care
Protected module for managing personal pet profiles. Track activities, weight history and set reminders for vaccinations and vet appointments.

### Shop
Product catalogue with smart recommendations based on the user's pet profile. Cart management with real-time badge updates via RxJS BehaviorSubject. PawPoints loyalty system — points earned on every purchase, redeemable for discounts.

### Lost & Found
Community board for reporting lost or found pets. Three listing statuses: Lost, Found, Successfully Reunited. Listings are filterable by status, pet type and city.

### Authentication
Local authentication with localStorage persistence. Route protection via `CanActivateFn` guard. After login, users are redirected back to the originally requested route.

---

## Design System

A warm, modern light theme with consistent CSS custom properties across all components.

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#C96442` | Primary actions, links |
| `--gold` | `#C8902A` | PawPoints, rewards |
| `--sage` | `#5A8F64` | Health, success states |
| `--bg-base` | `#FAFAF8` | Page background |
| `--font-display` | Lora | Headings |
| `--font-sans` | Inter | Body, UI |

---

## Development

```bash
# Start development server
ng serve

# Production build
ng build

# Generate a new component
ng generate component features/component-name
```