import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ArtworkDetailsComponent } from './features/shop/artwork-details/artwork-details.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "shop", component: ShopComponent
  },
  {
    path: "shop/:id", component: ArtworkDetailsComponent
  },
  {
    path: "**", redirectTo: "", pathMatch: "full",
  },
];
