import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductCardComponent } from '../pages/products-list/product-card/product-card.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([
    {
      id: 1,
      title: 'Blue-Pen',
      price: 100,
      image: '---',
      stock: 10,
    }, 

    {
      id: 2,
      title: 'Red-Pen',
      price: 100,
      image: '---',
      stock: 11,
    }, 
  ]);

  addToCart(product: Product) {
    this.cart.set([...this.cart(), product]);

  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((p) => p.id !== id));
  }

  constructor() { }
}
