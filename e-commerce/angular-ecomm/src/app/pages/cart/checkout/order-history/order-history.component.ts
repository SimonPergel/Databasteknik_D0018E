import { ChangeDetectorRef,Component, inject, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonBackComponent } from "../button-back/button-back.component";
import { CartService } from '../../../../services/cart.service';
import { CartItemComponent } from '../../cart-item/cart-item.component';
import { CartComponent } from '../../cart.component';
import { Orders } from '../../../../models/orders.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterLink, ButtonBackComponent],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  cartService = inject(CartService);
  orders: Orders[] = []; // Store fetched data

  ngOnInit() {
    //get the current users CartID
    const CartID = Number(localStorage.getItem("token"));
    // check for cartID
    if (!CartID) {
      console.error("There was no CartID that matched the current logged in user!");
      return;
    }
    // this part fetches orders that match with the current usersID
    this.cartService.getOrders(CartID).then(data => {
      this.orders = data; // saves the fetched data in this.orders
      console.log("this is the orders that are fetched:",this.orders);
    }).catch(error => {
      console.error("Error fetching orders:", error);
    });
  }
  // This is helps angular track seprate objects, if one changes dosent mean every object is changed 
  trackByOrderId(index: number, order: Orders): number {
    return order.checkoutID;  
  }
}
