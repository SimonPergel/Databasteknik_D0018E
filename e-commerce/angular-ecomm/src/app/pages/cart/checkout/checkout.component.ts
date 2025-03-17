import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartComponent } from '../cart.component';
import { RouterLink } from '@angular/router';
//import { Router } from '@angular/router';
//Sources 
// reduce()- https://www.geeksforgeeks.org/typescript-array-reduce-method/,
//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce,
// https://github.com/WalterUpgrade/Ebay/blob/master/lessons/12-create-cart-page.md
// Object.entries() - https://www.w3schools.com/jsref/jsref_object_entries.asp
// alert() - https://www.w3schools.com/jsref/met_win_alert.asp

@Component({
  selector: 'app-checkout',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div class="bg-slate-100 p-6 rounded-x1 shadow-x1  border">
      <h2 class="text-2xl" >Summary</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <span class="text-lg">Total</span>
          <span>{{ '$' + totalPrice}} </span>
        </div>
        <div class="flex gap-2"> <!-- Added a flex container for both buttons -->
        <app-primary-button label="Checkout" (buttonClicked)="handleCheckout()" />
       <app-primary-button label="Order History" routerLink="/orderHistory" queryParamsHandling="preserve"/>
      </div>

      </div>
    </div>
  `,
  styles: ``
})

export class CheckoutComponent {
  cartService = inject(CartService);
  cartItem = inject(CartItemComponent);
  cart = inject(CartComponent);

  constructor(private cdRef: ChangeDetectorRef) { }
  
  purchasedGoods = '' // this string will hold all the name of the items + the number of that item in one string

  // Reactive signal to get cart items, it recomputes when changed
  cartItems = computed(() => this.cartService.cart());
  // Getter to calculate the total price of the Cart
  get totalPrice(): number {
    return this.cartItems().reduce((total, item) => total + item.price, 0);
  }

  // this function handles checkout button clicked
  async handleCheckout(): Promise<void> {
    let CartIDs = Number(localStorage.getItem("token"));
    // this checks if the cart is emty
    if (this.cartItems().length === 0) {
      console.log("Cart is empty!");
      return;
    }

    console.log("cartItems in handleCheckout function:", this.cartItems());  // 
  
    // this groups the items in the cart by there name and sum up there quantities
    const groupedItems = this.cartItems().reduce((acc, item) => { // reduce iterates over the cartItem array and stores the result in acc
      const name = this.cart.productList.find(p => p.id === item.productID)?.name ?? ""; 
      if (acc[name]) {
        console.log("Item product name in checkout:", this.cart.productList.find(p => p.id === item.productID)?.name);
        acc[name] += item.quantity; // Add quantity if already exists
      } 
      else {
        console.log("Item product name in checkout:", this.cart.productList.find(p => p.id === item.productID)?.name);
        acc[name] = item.quantity; // Initialize if it's the first time
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
    
    try {
      // save the current cart status to get the acess needed
      const productStatus = await this.cartService.getProduct(); // returns a Product[]
      console.log("Product Status (From DB):", productStatus);
    
      // Group items with the same productID and count total quantity per product
      const productMap = this.cartItems().reduce((acc, item) => {
        acc[item.productID] = (acc[item.productID] || 0) + item.quantity;
        return acc;
      }, {} as { [key: number]: number });
    
      console.log("Total quantity per product in cart:", productMap);
    
      // loops tru all grouped items and save the total quantity for a item in form of a number
      for (const productID in productMap) { 
        const name = this.cart.productList.find(p => p.id === Number(productID))?.name ?? ""; 
        const totCartQuantity = productMap[Number(productID)];                // retrieves the total quantity for a product
        const product = productStatus.find(p => p.id === Number(productID));  // finds the product in the cart
        // for debugging
        if (product) {
          console.log(`Stock for ${product.id}: ${product.quantity}, Cart Quantity: ${totCartQuantity}`);
        } else {
          console.log(`Product not found in DB for ID: ${productID}`);
          continue; 
        }
    
        // Check if total cart quantity exceeds available stock
        if (totCartQuantity > product.quantity) {
          console.log(`Not enough stock for Product ID: ${productID} (Stock: ${product.quantity}, Requested: ${totCartQuantity})`);
          alert(`Cannot checkout! Not enough stock for this product: ${name}.`); // this cool feature displays a alert box with a ok
          return; // Stop checkout process
        }
        //if the user dosent have enought money, it should not be possible to checkout
      }
      if (this.totalPrice > await this.cartService.getUserBalance(Number(localStorage.getItem("token")))) {
        alert("Cannot checkout! User balance too low.");
        return;
      }

      // Ensure each checkout request is complete before moving forward
      const response = await this.cartService.cartCheckout(CartIDs, this.totalPrice, this.purchasedGoods);
      // Alter the account balance of a User
      const r  = await this.cartService.updateUserBalance(CartIDs, this.totalPrice);
    
      // Reduce stock quantities locally and in the database
      for (const item of this.cartItems()) {
        const res = await this.cartService.depleteStockQuantity(item.productID, 1);
        console.log(`Decreased successfully, item ${item.productID}:`, response);
      }
    
      // Empty the whole cart
      const resp = await this.cartService.emtyCart(CartIDs);
      this.cdRef.detectChanges();
      console.log(`Checkout successful for item ${this.purchasedGoods}:`, response);
      console.log(`All items were successfully emptied from the cart: ${CartIDs}:`, resp);
      console.log(`Balance have been updated in db for User_id: ${CartIDs}:`, r);
    
    } catch (error) {
      console.error(`Error during checkout:`, error);
    }
  }
}
