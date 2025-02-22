import { Component, inject, OnInit } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from "@angular/material/card";
import { ArtworkItemComponent } from '../../features/shop/artwork-item/artwork-item.component';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, ArtworkItemComponent, MatButton, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
