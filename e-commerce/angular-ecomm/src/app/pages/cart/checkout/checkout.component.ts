import { Component, computed, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { DataService } from '../../../services/data.service';
import { Cart } from '../../../models/cart.models';
import { Product } from '../../../models/product.models';


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
  
  purchasedGoods = '' // this string will hold all the name of the items + the number of that item in one string

  // Reactive signal to get cart items
  cartItems = computed(() => this.cartService.cart());
  
// Getter to calculate the total price of the Cart
get totalPrice(): number {
  return this.cartItems().reduce((total, item) => total + item.price, 0);
}
  // this function handles checkout button clicked
 async handleCheckout(): Promise<void> {
  let CartIDs = 1;
    if (this.cartItems().length === 0) {
      console.log("Cart is empty!");
      return;
  }
  // this constructs the purchasedGoods string
  this.purchasedGoods = this.cartItems().map(item => `${item.ProductName} x${item.quantity}`).join(': ');
  // prints for debug
  console.log('Purchased Goods:', this.purchasedGoods);

  // TODO: cartID, totalprice, string purchaedGoods
  // TODO: call deleteFromCart in db and on frotend
  // TODO: check that all items is in stock
 
  
    try {
      // Get all cart IDs and calculate the total price
    const cartID = this.cartItems().map(item => item.cartID);
      //ensures that each checkout request is complete before moving forward
      const response = await this.cartService.cartCheckout(CartIDs, this.totalPrice, this.purchasedGoods);
      //console.log(`Checkout successful for item ${item.productID}:`, response);
    } catch (error) {
      console.error(`Error during checkout for item :`, error);
    }
  }
    
  }

