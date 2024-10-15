import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from "@angular/material/divider";
import { MatSliderModule } from "@angular/material/slider";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input"
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [MatDivider, MatSliderModule, MatFormField, MatLabel, MatInput, FormsModule, CurrencyPipe],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService = inject(ShopService);
  priceRange = {
    low: 0,
    high: 1000000000,
  };
  sliderConfig = {
    min: 0,
    max: 1000000000,
    step: 100000
  }

  onLowChange(value: string) {
    // Remove currency formatting and parse to number
    const newValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(newValue)) {
      this.priceRange.low = newValue;
    }
  }

  onHighChange(value: string) {
    // Remove currency formatting and parse to number
    const newValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(newValue)) {
      this.priceRange.high = newValue;
    }
  }

  applyFilters() {
    console.log("Filters applied with price range:", this.priceRange);
  }

}
