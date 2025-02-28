import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.models';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';
import { StarRatingComponent } from '../../../../star-rating/star-rating.component';


@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, StarRatingComponent],
  template: `
  <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
    <div class="mx-auto">
      <div class="flex flex-col mt-2">
        <span class="text-md front-bold">{{ product().name}}</span>
        <span class="text-sm ">{{ '$' + product().price}}</span>
        <app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="cartService.insertIntoCart(1, 1, product())"/> <!-- are we reaching the name-->
      </div>
      <h2>Rate this page:</h2>
      <app-star-rating [(rating)]="pageRating"></app-star-rating>
      <p>Your rating: {{ pageRating }}</p>


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
  pageRating: number = 3; // Default rating 

  cartService = inject(CartService);

  product = input.required<Product>();
 // product = input.required<Cart>();


}
