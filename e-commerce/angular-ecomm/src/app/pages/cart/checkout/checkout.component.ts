import { Component, computed, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { DataService } from '../../../services/data.service';
import { Cart } from '../../../models/cart.models';
import { Product } from '../../../models/product.models';

// Define the expected response structure
interface CheckoutResponse {
  Message: string;
  CartID: number;
  ProductID: number;
}

@Component({
  selector: 'app-checkout',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-x1 shadow-x1  border">
      <h2 class="text-2xl" >Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <span class="text-lg">Total</span>
          <span>{{ '$' + totalPrice}} </span>
        </div>
        <app-primary-button label="Checkout" (buttonClicked)="handleCheckout()" />
      </div>
    </div>
  `,
  styles: ``
})
export class CheckoutComponent {
  cartService = inject(CartService);

  // Reactive signal to get cart items
  cartItems = computed(() => this.cartService.cart());
  
// Getter to calculate the total price of the Cart
get totalPrice(): number {
  return this.cartItems().reduce((total, item) => total + item.price, 0);
}
  // this function handles checkout button clicked
 async handleCheckout(): Promise<void> {
    if (this.cartItems().length === 0) {
      console.log("Cart is empty!");
      return;
  }
/*
// this part iterates over the cart items and call cartCheckout() fore each item
  this.cart.forEach((item) => {
    // Ensure that item.cartID and item.productID are passed correctly
    this.cartService.cartCheckout(item.cartID, item.productID).subscribe({
      next: (response: CheckoutResponse) => {
        console.log(`Checkout successful for item ${item.productID}:`, response);

      },
      error: (error) => {
        console.error(`Error during checkout for item ${item.productID}:`, error);
      },
    });
  });
  */

  // TODO: cartID, totalprice, string purchaedGoods
 /*
  for (const item of this.cartItems()) {
    try {
      //ensures that each checkout request is complete before moving forward
      const response = await this.cartService.cartCheckout(item.cartID, item.productID);
      console.log(`Checkout successful for item ${item.productID}:`, response);
    } catch (error) {
      console.error(`Error during checkout for item ${item.productID}:`, error);
    }
  }
  */
  }
}

