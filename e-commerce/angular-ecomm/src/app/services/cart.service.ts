import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductCardComponent } from '../pages/products-list/product-card/product-card.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cart.set([...this.cart(), product]);

  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((p) => p.id !== id));
  }

  constructor() { }
}
