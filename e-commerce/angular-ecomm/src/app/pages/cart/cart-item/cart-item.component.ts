import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.models';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';

@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex gap-4 item-center">
      <div class="flex flex-col">
        <span class="text-md font-bold">{{cartItem().ProductName }}</span>
        <span class="text-sm">{{ '$' + cartItem().price }}</span>
      </div>
    <div class="flex-1"> </div>
      <app-button label="Remove item" (buttonClicked)="cartService.deleteFromCart(cartItem().productID)" />
    </div>
  `,
  styles:  ``
})
export class CartItemComponent {
  cartService = inject(CartService);
  //item = input.required<Product>();
  cartItem = input.required<Cart>();
}
