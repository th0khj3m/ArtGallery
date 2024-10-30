import { NumbersOnlyDirective } from './../../../directives/numbers-only.directive';
import { Component, inject, Input, input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { ReactiveFormsModule } from '@angular/forms';

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

  incrementQuantity() {
    this.cartService.addItemToCart(this.item())
  }

  decrementQuantity() {
    this.cartService.removeItemFromCart(this.item().artworkId);
  }

  updateQuantity(newQuantity: string) {
    // Check if the input value is a valid number
    const quantity = parseInt(newQuantity, 10)
    if (!isNaN(quantity) && this.cartService.cart()) {

    }

    // Remove non-numeric characters
    newQuantity = newQuantity.replace(/[^\d]/g, '');
  }

  removeItemFromCart() {
    this.cartService.removeItemFromCart(this.item().artworkId, this.item().quantity);
  }
}
