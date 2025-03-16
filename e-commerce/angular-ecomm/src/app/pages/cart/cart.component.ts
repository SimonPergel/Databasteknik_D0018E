import { Component, inject, Injectable, ChangeDetectorRef, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductsListComponent } from '../products-list/products-list.component';
import { Product } from '../../models/product.models';
import { FormsModule } from '@angular/forms';
import { userInfo } from '../../models/userInfo.models';
import { Router } from '@angular/router';
//import { Cart } from '../models/cart.models';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CheckoutComponent, FormsModule],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl ">Shopping Cart</h2>
      <div class="input-container">
        <h2>Your balance: {{ userBalance }}</h2>
          <form (ngSubmit)="onSubmit()" #newBalanceForm="ngForm">
            <label for="balance">Add more balance:</label>
            <input type="text" id="balance" [(ngModel)]="balance" name="balance" ngModel required placeholder="Enter the balance you want to add">
        
            <button type="submit">Add balance</button>
          </form>
      </div>
      
      @for (item of cartService.usersCart(); track item.productID) {
        <app-cart-item [cartItem]="item" />
      }
      <!-- Pass the cart items to the checkout component -->
      <app-checkout />
  `,
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
  //@Input() cart: Cart[] ss= []; // Declare 'cart' as an input
  // the data is allready available
  cartService = inject(CartService);
  products = inject(ProductsListComponent);
  constructor (
    private cdr: ChangeDetectorRef,
    private routes: Router
  ) { }
  //cartItem = input.required<Cart>();
  productList: Product [] = [];
  balance!: string;
  userInfos!: userInfo;
  userBalance!: number;
  //receipts: Receipts [] = [];
  
  async ngOnInit() {
    this.cartService.loadCart();
    this.cartService.usersCart();
    this.getProductData();
    await this.getUserBalance();
    /*
    this.cartService.getReceipts(Number(localStorage.getItem("token"))).subscribe({
      next: (response) => {
        console.log("Fetched Receipts:", response);
        this.receipts = response;
        console.log('Receipt Object:', this.receipts);
      },
      error: (error) => {
        console.error("Error fetching Receipts:", error);
      }
    });
    */
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

  async getUserBalance() {
    const UserBalance = await this.cartService.getUserBalance(Number(localStorage.getItem("token")));
    this.userBalance = UserBalance;
  }

  async onSubmit() {
    console.log("Added balance is:", this.balance);
    this.cartService.addUserBalance(Number(localStorage.getItem("token")), Number(this.balance));
    await this.getUserBalance();
    this.cdr.detectChanges();
    this.balance = '';
    this.ngOnInit();
  }
  /*
  trackBycart_id(index: number, receipt: Receipts): number {
    return receipt.cart_id;
  }
  */
}
