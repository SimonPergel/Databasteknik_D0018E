import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";

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
        <app-primary-button label="Checkout" />
      </div>
    </div>
  `,
  styles: ``
})
export class CheckoutComponent {

  cartService = inject(CartService);

  totalPrice = computed(() => {
    let totalPrice = 0;
    for(const item of this.cartService.cart()) {
      totalPrice += item.price;
    }

    return totalPrice;
  })

}