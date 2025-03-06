import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  imports: [
    FormsModule
  ]
})
export class AddProductComponent {
  constructor(private routes: Router) {}
  productName: string = '';
  quantity: string = '';
  price: string = '';

  onSubmit() {
    console.log('Product name:', this.productName);
    console.log('Quantity:', this.quantity);
    console.log('Price:', this.price);

  }
}
