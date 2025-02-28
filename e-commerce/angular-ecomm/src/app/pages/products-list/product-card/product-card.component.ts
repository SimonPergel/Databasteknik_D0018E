import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.models';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';
import { StarRatingComponent } from '../../../../star-rating/star-rating.component';
import { ProductAndRatingService } from '../../../services/productandRating.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, StarRatingComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
      <div class="mx-auto">
        <div class="flex flex-col mt-2">
          <span class="text-md font-bold">{{ product.name }}</span>
          <span class="text-sm ">{{ '$' + product.price }}</span>
          <app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="cartService.insertIntoCart(1, 1, product)"/> 
        </div>
        <h2>Rate this page:</h2>
        <app-star-rating [(rating)]="pageRating"></app-star-rating>
        <p>Your rating: {{ pageRating }}</p>

        <span class="absolute top-2 right-3 text-sm font-bold" 
        [class]="product.inStock ? 'text-green-500' : 'text-red-500'">
          {{ product.quantity ? product.quantity + ' left' : 'Out of stock' }}
        </span>
  
  <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
    <div class="mx-auto">
      <div class="flex flex-col mt-2">
        <span class="text-md front-bold">{{ product().name}}</span>
        <span class="text-sm ">{{ '$' + product().price}}</span>
        <!--<app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="cartService.insertIntoCart(1, 1, product())"/> --> <!-- are we reaching the name-->
        <app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="insertHandler()"/>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent implements OnInit {
  pageRating: number = 3; // Default rating will now be updated to the average rating

  cartService = inject(CartService);
  productAndRatingService = inject(ProductAndRatingService);

  @Input() product!: Product;  // Corrected input usage

  constructor() {}
 // this method handles the inserting into cart part
async insertHandler() {
  // check if the product is in stock, if not, the customer shouldent be able to add it to the cart
  if (this.product().inStock !== 0) {
    try{
    const response = await this.cartService.insertIntoCart(1,1, this.product());
    console.log(`The inserting process was successful for item ${this.product().name}:`, response);

  } catch (error) {
    console.error(`Error during inserting process for item :`, error);
  }

  }else {
    console.log("The item is not available in stock at the moment!")
  }
  
  

}

  ngOnInit() {
    console.log("Product in ProductCard:", this.product);
    this.productAndRatingService.setProductId(this.product.id);

    // Fetch and update the rating once productId is set
    this.productAndRatingService.getProductIdRating().subscribe(rating => {
      this.pageRating = rating ?? 0; // Update pageRating with the fetched rating
    });
  }
}
