import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  imports: [
    FormsModule
  ]
})
export class AddProductComponent {
  dataService = inject(DataService);
  constructor
  (
  private routes: Router
  ) {}
  productName: string = '';
  quantity: string = '';
  price: string = '';

  async onSubmit() {
    console.log('Product name:', this.productName);
    console.log('Quantity:', this.quantity);
    console.log('Price:', this.price);

    await this.dataService.addNewProduct(this.productName, Number(this.quantity), Number(this.price));
    this.routes.navigate(['/'], { queryParams: { queryParams: Number(localStorage.getItem("token")) }, queryParamsHandling: 'merge' })
  }
}
