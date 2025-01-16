import { Component, inject, OnInit } from '@angular/core';
import { Artwork } from '../../shared/models/artwork';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from '@angular/material/card';
import { ArtworkItemComponent } from './artwork-item/artwork-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { MatListOption, MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ArtworkItemComponent, MatIcon, MatButton, MatMenu,
    MatSelectionList, MatListOption, MatMenuTrigger, MatPaginator, FormsModule, MatIconButton, MatInput],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  artworks?: Pagination<Artwork>
  sortOptions = [
    { name: "Alphabetical", value: "title" },
    { name: "Price: Low-High", value: "priceAsc" },
    { name: "Price: High-Low", value: "priceDesc" }
  ];
  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15]

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.getArtworks();
  }

  getArtworks() {
    this.shopService.getArtworks(this.shopParams).subscribe({
      next: response => this.artworks = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    })
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1;
    this.getArtworks();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getArtworks();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getArtworks();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: "500px",
      data: {
        priceRange: this.shopParams.priceRange
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.shopParams.priceRange = result.priceRange;
          this.shopParams.pageNumber = 1;
          this.getArtworks();
        }
      }
    })
  }

}
