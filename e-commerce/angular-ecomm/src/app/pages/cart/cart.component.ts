import { Component, inject, Input, input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from "./checkout/checkout.component";
//import { Cart } from '../models/cart.models';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent,CheckoutComponent],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl ">Shopping Cart</h2>
      @for (item of cartService.cart(); track item.productID) {
        <app-cart-item [cartItem]="item" />
      }
      <!-- Pass the cart items to the checkout component -->
      <app-checkout />


    </div>
  `,
  styles: ``
})
export class CartComponent {
  //@Input() cart: Cart[] = []; // Declare 'cart' as an input
// the data is allready available
  cartService = inject(CartService);
  //cartItem = input.required<Cart>();
}
