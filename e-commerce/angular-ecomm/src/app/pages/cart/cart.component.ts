import { Component, inject, Input, input, Injectable } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../models/product.models';
import { FormsModule } from '@angular/forms';
//import { Cart } from '../models/cart.models';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-cart',
  imports: [CartItemComponent,CheckoutComponent, FormsModule],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl ">Shopping Cart</h2>
      <div class="input-container">
        <h2>Add balance</h2>
          <form (ngSubmit)="onSubmit()" #newBalanceForm="ngForm">
            <label for="balance">Added balance:</label>
            <input type="text" id="balance" [(ngModel)]="balance" name="balance" ngModel required placeholder="Enter the balance you want to add">
        
            <button type="submit">Add balance</button>
          </form>
      </div>
      @for (item of cartService.usersCart(); track item.productID) {
        <app-cart-item [cartItem]="item" />
      }
      <!-- Pass the cart items to the checkout component -->
      <app-checkout />


    </div>
  `,
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent {
  //@Input() cart: Cart[] = []; // Declare 'cart' as an input
// the data is allready available
  cartService = inject(CartService);
  products = inject(ProductsListComponent);
  //cartItem = input.required<Cart>();
  productList: Product [] = [];
  balance!: number;
  
  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.usersCart();
    this.getProductData();
  }

  getProductData() {
    const storedData = localStorage.getItem("products");

    if (storedData) {
      this.productList = JSON.parse(storedData);
      console.log("Products in productList is:", this.productList);
    } else {
      console.log("No stored data found");
    }
  }

  onSubmit() {
    console.log("Added balance is:", this.balance);
    this.cartService.addUserBalance(Number(localStorage.getItem("token")), this.balance);
  }
}
