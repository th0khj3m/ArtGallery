import { Component, inject, OnInit } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from "@angular/material/card";
import { ArtworkItemComponent } from '../../features/shop/artwork-item/artwork-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from '../../features/shop/filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatCard, ArtworkItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  artworks: Artwork[] = [];

  ngOnInit(): void {
    this.getArtworks();
  }

  getArtworks() {
    this.shopService.getArtworks().subscribe({
      next: response => this.artworks = response.data,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    })
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: "500px",

    })
  }

}
