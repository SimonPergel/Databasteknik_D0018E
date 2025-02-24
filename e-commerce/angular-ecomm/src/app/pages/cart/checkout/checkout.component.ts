import { Component, computed, inject, input } from '@angular/core';
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
          <span>{{ '$' + totalPrice()}} </span>
        </div>
        <app-primary-button label="Checkout" (buttonClicked)="handleCheckout()" />
      </div>
    </div>
  `,
  styles: ``
})
export class CheckoutComponent {
  cart: Cart []=[]
  product: Product []=[]
  //item = input.required<Cart>();
  cartService = inject(CartService);
  dataService = inject(DataService);
  

  constructor() {}

// calculating the total price of the Cart
  totalPrice = computed(() => {
    return this.cart.reduce((total, item) => total + item.price, 0);
    });
   
    /*
  ngOnInit(): void {
   // this.cart = this.dataService.cart(); // this loads the cart from cartService
   this.cart = this.dataService.cart();
  }
*/
  // this function handles checkout button clicked
  handleCheckout(): void {
    if (this.cart.length === 0) {
      console.log("Cart is empty!");
      return;
  }
// this part iterates over the cart items and call cartCheckout() fore each item
  this.cart.forEach((item) => {
    this.dataService.cartCheckout(item.cartID, item.productID).subscribe({
      next: (response) => {
        console.log(`Checkout successful for item ${item.productID}:`, response);

      },
      error: (error) => {
        console.error(`Error during checkout for item ${item.productID}:`, error);
      },
    });
  });
  }
}

