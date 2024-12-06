import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Artwork } from '../../shared/models/artwork';
import { map } from 'rxjs';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);
  itemCount = computed(() => {
    const items = this.cart()?.items;
    const uniqueItem = new Set(items?.map(item => item.artworkId));
    return uniqueItem.size;
  });
  selectedDelivery = signal<DeliveryMethod | null>(null);
  totals = computed(() => {
    const cart = this.cart();
    const delivery = this.selectedDelivery();
    if (!cart) return { subtotal: 0, shipping: 0, discount: 0, total: 0 };
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = delivery ? delivery.price : 0;
    const discount = 0;
    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount
    }
  })

  getCart(id: string) {
    return this.http.get<Cart>(this.baseUrl + "cart?id=" + id).pipe(
      map(cart => {
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart: Cart) {
    console.log('Sending cart to server:', cart); // Log the cart being sent
    return this.http.post<Cart>(this.baseUrl + "cart", cart).subscribe({
      next: cart => this.cart.set(cart)
    })
  }

  deleteCart() {
    this.http.delete(this.baseUrl + "cart?id=" + this.cart()?.id).subscribe({
      next: () => {
        localStorage.removeItem("cart_id");
        this.cart.set(null);
      }
    })
  }

  addItemToCart(item: CartItem | Artwork, quantity = 1) {
    const cart = this.cart() ?? this.createCart();
    if (this.isArtwork(item)) {
      item = this.mapArtworkToCartItem(item);
    }
    this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  removeItemFromCart(artworkId: number, quantity = 1) {
    const cart = this.cart();
    if (!cart) return;
    const index = cart.items.findIndex(x => x.artworkId === artworkId);
    if (index !== -1) {
      if (cart.items[index].quantity > quantity) {
        cart.items[index].quantity -= quantity;
      } else {
        cart.items.splice(index, 1);
      }
      if (cart.items.length === 0) {
        this.deleteCart();
      } else {
        this.setCart(cart);
      }
    }
  }

  changeItemQuantity(artworkId: number, newQuantity: number) {
    const cart = this.cart();
    if (!cart) return;

    const item = cart.items.find(x => x.artworkId === artworkId);
    if (item) {
      item.quantity = newQuantity;
      this.setCart(cart);
    }
  }

  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): void {
    const index = items.findIndex(x => x.artworkId === item.artworkId);
    if (index === -1) {
      item.quantity = quantity;
      items.push(item);
    } else {
      items[index].quantity += quantity;
    }
  }

  private mapArtworkToCartItem(item: Artwork): CartItem {
    return {
      artworkId: item.id,
      artworkTitle: item.title,
      price: item.price,
      quantity: 0,
      imageUrl: item.imageUrl
    }
  }

  private isArtwork(item: CartItem | Artwork): item is Artwork {
    return (item as Artwork).id !== undefined;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
