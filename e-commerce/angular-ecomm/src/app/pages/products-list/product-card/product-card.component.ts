import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product.models';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
  <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative">
    <div class="mx-auto">
      <img [src]="product().image" class="w-[200px] h-[100px] object-contain"
      />
      <div class="flex flex-col mt-2">
        <span class="text-md front-bold">{{ product().title}}</span>
        <span class="text-sm ">{{ '$' + product().price}}</span>
        <app-primary-button label="Add to cart" class="mt-3" (buttonClicked)="cartService.addToCart(product())"/>
      </div>

      <span class="absolute top-2 right-3 text-sm font-bald" 
      [class]= "product().stock ? 'text-green-500' : 'text-red-500'">
        @if (product().stock) {
          {{product().stock}} left
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


}
