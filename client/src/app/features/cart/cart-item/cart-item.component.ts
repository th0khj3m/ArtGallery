import { NumbersOnlyDirective } from './../../../directives/numbers-only.directive';
import { Component, inject, Input, input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink, MatButton, MatIcon, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);
  private dialogService = inject(MatDialog);

  incrementQuantity() {
    this.cartService.addItemToCart(this.item())
  }

  decrementQuantity() {
    if (this.item().quantity === 1) {
      const dialogRef = this.dialogService.open(ConfirmDeleteDialogComponent, {
        minWidth: "500px",
        data: {
          title: this.item().artworkTitle
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.removeItemFromCart();
        }
      });
    } else {
      this.cartService.removeItemFromCart(this.item().artworkId);
    }
  }

  updateQuantity(newQuantity: string) {
    if (newQuantity === "") return;
    const quantity = Number(newQuantity);
    this.cartService.changeItemQuantity(this.item().artworkId, quantity);
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(this.item().artworkId, this.item().quantity);
  }
}
