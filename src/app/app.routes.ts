import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
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
import { LoginComponent } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ── Home ──
  { path: '', component: HomeComponent },

  // ── Auth ──
  { path: 'login', component: LoginComponent },

  // ── Adoption ──
  { path: 'adoption',           component: AdoptionListComponent },
  { path: 'adoption/add',       component: AddAdoptionPetComponent },
  { path: 'favorites',          component: FavoritesComponent },
  { path: 'adoption/:id',       component: AdoptionDetailsComponent },
  { path: 'adoption/:id/apply', component: AdoptionApplyComponent },

  // ── Pet Care — заштитени ──
  {
    path: 'pet-care',
    component: PetDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pet-care/profile/add',
    component: PetProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pet-care/profile/:id',
    component: PetProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pet-care/activities/:id',
    component: PetActivitiesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pet-care/reminders/:id',
    component: PetRemindersComponent,
    canActivate: [authGuard]
  },

  // ── Shop ──
  { path: 'shop',      component: ShopListComponent },
  { path: 'shop/cart', component: CartComponent },
  { path: 'shop/:id',  component: ShopDetailsComponent },

  // ── Lost & Found ──
  { path: 'lost-found',     component: LostFoundListComponent },
  { path: 'lost-found/add', component: LostFoundFormComponent },

];