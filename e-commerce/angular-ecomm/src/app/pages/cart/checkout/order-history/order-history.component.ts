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
  orders: Orders[] = []; // Store fetched orders

  ngOnInit() {
    const CartID = Number(localStorage.getItem("token"));
    if (!CartID) {
      console.error("No CartID found in localStorage!");
      return;
    }

    this.cartService.getOrders(CartID).then(data => {
      this.orders = data;
    }).catch(error => {
      console.error("Error fetching orders:", error);
    });
  }
  // Define trackBy function to optimize rendering
  trackByOrderId(index: number, order: Orders): number {
    return order.Checkout_id;  // assuming CheckoutID is the unique identifier
  }
}
