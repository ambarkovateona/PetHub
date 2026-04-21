import { Routes } from '@angular/router';
import { AdoptionListComponent } from './features/adoption/adoption-list/adoption-list';
import { AdoptionDetailsComponent } from './features/adoption/adoption-details/adoption-details';
import { AdoptionApplyComponent } from './features/adoption/adoption-apply/adoption-apply';
import { FavoritesComponent } from './features/adoption/favorites/favorites';
import { AddAdoptionPetComponent } from './features/adoption/add-adoption-pet/add-adoption-pet';

export const routes: Routes = [
  { path: '', redirectTo: 'adoption', pathMatch: 'full' },


  { path: 'adoption',           component: AdoptionListComponent },
  { path: 'adoption/add',       component: AddAdoptionPetComponent },
  { path: 'favorites',          component: FavoritesComponent },

  
  { path: 'adoption/:id',       component: AdoptionDetailsComponent },
  { path: 'adoption/:id/apply', component: AdoptionApplyComponent },
];