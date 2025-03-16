import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonBackComponent } from "../button-back/button-back.component";
import { CartService } from '../../../../services/cart.service';
import { Orders } from '../../../../models/orders.models';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterLink, ButtonBackComponent],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})

export class OrderHistoryComponent implements OnInit {
  constructor (
    private route: ActivatedRoute
  ) {}
  cartService = inject(CartService);
  dataService = inject(DataService);
  orders: Orders[] = []; // Store fetched data
  template!: string;
  id!: number;

  ngOnInit() {
    //get the current users CartID
    const CartID = Number(localStorage.getItem("token"));
    // check for cartID
    if (!CartID) {
      console.error("There was no CartID that matched the current logged in user!");
      return;
    }
    // this part fetches orders that match with the current usersID
    this.route.queryParams.subscribe(async params => {
      this.id = params['id'];
      if (await this.dataService.checkAdmin(Number(this.id))) {;
        this.template = 'admin';
        this.cartService.getAllOrders().then(data => {
          this.orders = data;
          console.log("These are all orders:", this.orders);
        }).catch(error => {
          console.error("Error fetching orders:", error);
        });
      }
      else {
        this.cartService.getOrders(CartID).then(data => {
          this.orders = data; // saves the fetched data in this.orders
          console.log("this is the orders that are fetched:",this.orders);
        }).catch(error => {
          console.error("Error fetching orders:", error);
        });
      }
    });
  }
  // This is helps angular track seprate objects, if one changes dosent mean every object is changed 
  trackByOrderId(index: number, order: Orders): number {
    return order.checkoutID;  
  }
}
