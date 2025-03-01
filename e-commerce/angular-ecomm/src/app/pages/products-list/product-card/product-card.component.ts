import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.models';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
  <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
    <div class="mx-auto">
      <div class="flex flex-col mt-2">
        <span class="text-md front-bold">{{ product().name}}</span>
        <span class="text-sm ">{{ '$' + product().price}}</span>
        <!--<app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="cartService.insertIntoCart(1, 1, product())"/> --> <!-- are we reaching the name-->
        <app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="insertHandler()"/>
      </div>

      <span class="absolute top-2 right-3 text-sm font-bald" 
      [class]= "product().inStock ? 'text-green-500' : 'text-red-500'">
        @if (product().quantity) {
          {{product().quantity}} left
        }@else {
          Out of stock
        }



      </span>
    </div>
  </div>
  `,
  styles: ``
})
export class ProductCardComponent {

  cartService = inject(CartService);

  product = input.required<Product>();
 // product = input.required<Cart>();

 // this method handles the inserting into cart part
async insertHandler() {
  // check if the product is in stock, if not, the customer shouldent be able to add it to the cart
  if (Number(localStorage.getItem("token")) === 0) {
    alert("You have to log in to add products to your cart")
    return
  }
  if (this.product().inStock !== 0) {
    try {
    const response = await this.cartService.insertIntoCart(Number(localStorage.getItem("token")), 1, this.product());
    console.log(`The inserting process was successful for item ${this.product().name}:`, response);

    } catch (error) {
      console.error(`Error during inserting process for item :`, error);
    }
  } else {
    console.log("The item is not available in stock at the moment!")
  }
  
  

}

}
