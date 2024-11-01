import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from '../../../shared/models/artwork';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-artwork-details',
  standalone: true,
  imports: [DecimalPipe, MatButton, MatIcon, MatFormField, MatInput, MatLabel, MatDivider, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './artwork-details.component.html',
  styleUrl: './artwork-details.component.scss'
})
export class ArtworkDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  artwork?: Artwork;
  quantityInCart = 0;
  quantity = 1;

  ngOnInit(): void {
    this.loadArtwork();
  }

  loadArtwork() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (!id) return;
    this.shopService.getArtwork(+id).subscribe({
      next: artwork => {
        this.artwork = artwork;
        this.updateQuantityInCart();
      },
      error: error => console.log(error)
    })
  }

  updateCart() {
    if (!this.artwork) return;
    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.artwork, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.artwork.id, itemsToRemove);
    }
  }

  updateQuantityInCart() {
    this.quantityInCart = this.cartService.cart()?.items
      .find(x => x.artworkId === this.artwork?.id)?.quantity || 0;
    this.quantity = this.quantityInCart || 1;
  }

  getButtonText() {
    return this.quantityInCart > 0 ? "Update cart" : "Add to cart"
  }

}
