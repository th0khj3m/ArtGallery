import { Component, inject, OnInit } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from "@angular/material/card";
import { ArtworkItemComponent } from '../../features/shop/artwork-item/artwork-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatCard, ArtworkItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private shopService = inject(ShopService);
  artworks: Artwork[] = [];
}
