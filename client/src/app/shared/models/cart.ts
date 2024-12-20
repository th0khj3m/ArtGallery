import { nanoid } from "nanoid";

export type CartType = {
  id: string;
  items: CartItem[];
  deliveryMethodId?: number;
  paymentIntentId?: string;
  clientSecret?: string;
}

export type CartItem = {
  artworkId: number;
  artworkTitle: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export class Cart implements CartType {
  id = nanoid();
  items: CartItem[] = [];
  deliveryMethodId?: number;
  paymentIntentId?: string;
  clientSecret?: string;
}
