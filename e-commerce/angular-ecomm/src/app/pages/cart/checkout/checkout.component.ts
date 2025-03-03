import { Component, computed, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { DataService } from '../../../services/data.service';
import { Cart } from '../../../models/cart.models';
import { Product } from '../../../models/product.models';

//Sources 
// reduce()- https://www.geeksforgeeks.org/typescript-array-reduce-method/
// Object.entries() - https://www.w3schools.com/jsref/jsref_object_entries.asp
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

  // Reactive signal to get cart items, it recomputes when changed
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

  // this groups the items in the cart by there name and sum up there quantities
  const groupedItems = this.cartItems().reduce((acc, item) => { // reduce iterates over the cartItem array and stores the result in acc
    if (acc[item.ProductName]) {
      acc[item.ProductName] += item.quantity; // Add quantity if already exists
    } else {
      acc[item.ProductName] = item.quantity; // Initialize if it's the first time
    }
    return acc;
  }, {} as { [key: string]: number }); // starts as an emty object

  // Construct the purchasedGoods string as a array of key-value pairs
  // Object.entries() converts an object into an array of key-pairs
  this.purchasedGoods = Object.entries(groupedItems)
  .map(([productName, quantity]) => `${productName} x${quantity}`)
  .join(': ');

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
      
      //This method should reduce the quantiesties localy and at the database
      for ( const item of this.cartItems()){
        const res = await this.cartService.depleteStockQuantity(item.productID, 1);
        console.log(`Decreased successfully, item ${item.productID}:`, response)
      }

      // emty the whole cart
      const resp = await this.cartService.emtyCart(CartIDs);
      // prints for debug and error handling
      console.log(`Checkout successful for item ${this.purchasedGoods}:`, response);
      console.log(`All items was successfully emtied from the cart: ${CartIDs}:`, resp);
    } catch (error) {
      console.error(`Error during checkout for item :`, error);
    }
    
  }
}


