import { Component, inject, input, ChangeDetectorRef } from '@angular/core';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex gap-4 item-center">
      <div class="flex flex-col">
        <span class="text-md font-bold">{{getProductName() }}</span>
        <span class="text-sm">{{ '$' + cartItem().price }}</span>
      </div>
    <div class="flex-1"> </div>
      <app-button label="Remove item" (buttonClicked)="removeItem()" />
    </div>
  `,
  styles:  ``
})
export class CartItemComponent {
  cartService = inject(CartService);
  cart = inject(CartComponent);
  //item = input.required<Product>();
  cartItem = input.required<Cart>();

  constructor(private cdRef: ChangeDetectorRef) { }

  getProductName() {
    return this.cart.productList.find(p => p.id === this.cartItem().productID)?.name ?? null;
  }

  getProductID() {
    return this.cart.productList.find(p => p.id === this.cartItem().productID)?.id ?? 0;
  }

  removeItem(): void {
    this.cartService.deleteFromCart(this.getProductID());
    this.cdRef.detectChanges();
  }
}
