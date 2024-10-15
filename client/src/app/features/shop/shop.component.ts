import { Component, inject, OnInit } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from '@angular/material/card';
import { ArtworkItemComponent } from './artwork-item/artwork-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ MatCard, ArtworkItemComponent, MatIcon ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  artworks: Artwork[] = [];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
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
