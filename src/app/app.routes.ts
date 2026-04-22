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

export const routes: Routes = [
  { path: '', redirectTo: 'adoption', pathMatch: 'full' },

  // ── Adoption ruti (postojni) ──
  { path: 'adoption',           component: AdoptionListComponent },
  { path: 'adoption/add',       component: AddAdoptionPetComponent },
  { path: 'favorites',          component: FavoritesComponent },
  { path: 'adoption/:id',       component: AdoptionDetailsComponent },
  { path: 'adoption/:id/apply', component: AdoptionApplyComponent },

  // ── Pet-care ruti (novi) ──
  { path: 'pet-care',                component: PetDashboardComponent },
  { path: 'pet-care/profile/add',    component: PetProfileComponent },
  { path: 'pet-care/profile/:id',    component: PetProfileComponent },
  { path: 'pet-care/activities/:id', component: PetActivitiesComponent },
  { path: 'pet-care/reminders/:id',  component: PetRemindersComponent },
];