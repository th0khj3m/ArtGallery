import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from "@angular/material/divider";
import { MatSliderModule } from "@angular/material/slider";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input"
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [MatDivider, MatSliderModule, MatFormField, MatLabel, MatInput, FormsModule, CurrencyPipe, MatButton, FormsModule],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>)
  data = inject(MAT_DIALOG_DATA);

  priceRange = this.data.priceRange;

  sliderConfig = {
    min: 0,
    max: 100000000,
    step: 100000
  }

  onLowChange(value: string) {
    // Remove currency formatting and parse to number
    const lowValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(lowValue)) {
      this.priceRange.low = lowValue;
    }
  }

  onHighChange(value: string) {
    // Remove currency formatting and parse to number
    const highValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(highValue)) {
      this.priceRange.high = highValue;
    }
  }

  applyFilters() {
    this.dialogRef.close({
      priceRange: this.priceRange
    });
  }

}
