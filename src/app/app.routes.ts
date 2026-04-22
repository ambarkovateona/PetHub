import { Routes } from '@angular/router';
import { AdoptionListComponent } from './features/adoption/adoption-list/adoption-list';
import { AdoptionDetailsComponent } from './features/adoption/adoption-details/adoption-details';
import { AdoptionApplyComponent } from './features/adoption/adoption-apply/adoption-apply';
import { FavoritesComponent } from './features/adoption/favorites/favorites';
import { AddAdoptionPetComponent } from './features/adoption/add-adoption-pet/add-adoption-pet';
import { PetDashboardComponent } from './features/pet-care/pet-dashboard/pet-dashboard';
import { PetProfileComponent } from './features/pet-care/pet-profile/pet-profile';
import { PetActivitiesComponent } from './features/pet-care/pet-activities/pet-activities';
import { PetRemindersComponent } from './features/pet-care/pet-reminders/pet-reminders';
import { ShopListComponent } from './features/shop/shop-list/shop-list';
import { ShopDetailsComponent } from './features/shop/shop-details/shop-details';
import { CartComponent } from './features/shop/cart/cart';
import { LostFoundListComponent } from './features/lost-found/lost-found-list/lost-found-list';
import { LostFoundFormComponent } from './features/lost-found/lost-found-form/lost-found-form';

export const routes: Routes = [
  { path: '', redirectTo: 'adoption', pathMatch: 'full' },

  // ── Adoption ruti (postojni) ──
  { path: 'adoption',           component: AdoptionListComponent },
  { path: 'adoption/add',       component: AddAdoptionPetComponent },
  { path: 'favorites',          component: FavoritesComponent },
  { path: 'adoption/:id',       component: AdoptionDetailsComponent },
  { path: 'adoption/:id/apply', component: AdoptionApplyComponent },

  // ── Pet-care ruti (postojni) ──
  { path: 'pet-care',                component: PetDashboardComponent },
  { path: 'pet-care/profile/add',    component: PetProfileComponent },
  { path: 'pet-care/profile/:id',    component: PetProfileComponent },
  { path: 'pet-care/activities/:id', component: PetActivitiesComponent },
  { path: 'pet-care/reminders/:id',  component: PetRemindersComponent },

  // ── Shop ruti (postojni) ──
  { path: 'shop',      component: ShopListComponent },
  { path: 'shop/cart', component: CartComponent },
  { path: 'shop/:id',  component: ShopDetailsComponent },

  // ── Lost & Found ruti (novi) ──
  { path: 'lost-found',     component: LostFoundListComponent },
  { path: 'lost-found/add', component: LostFoundFormComponent },
];