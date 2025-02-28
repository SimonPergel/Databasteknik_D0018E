import { Component, signal, Type } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductCardComponent } from "./product-card/product-card.component";
import { json1component } from '../../components/json-1/json-1.component';
import { DataService } from '../../services/data.service';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `

  <div class="p-8 grid grid-cols-2 gap-4">
    @for (product of products; track product.id ) {
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of products; track product.id ) {
      <app-product-card [product]="product"/>
      }
    </div>
  `,
  styleUrl: './products-list.component.scss'
})

/*export class ProductClass implements Product {
  id: number;
  name: string;
  quantity: number;
  inStock?: number;
  price: number;

  constructor(id: number, name: string, quantity: number, inStock: number, price: number) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.inStock = inStock;
    this.price = price;
  }
} */

export class ProductsListComponent {
  pageRating: number = 3; // Default rating 
  products: Product []=[]
  constructor(
    private dataService: DataService,
  ) {}
  ngOnInit(): void {
    this.dataService.getProductsAdmin().subscribe( {
      next: (response) => {
        console.log("Fetched Products:", response);
        this.products = response; // ✅ Store the API data in products
      },
      error: (error) => {
        console.error("Error fetching products:", error);
      }
    });
  }

  trackById(index: number, product: Product) {
    return product.id; // ✅ Improves performance by tracking items correctly
  }
}
//    products = signal<Product[]>([])

//    data = this.dataService.getProductsAdmin();
/*  ngOnInit() {
    fetch("http://localhost:5201/api/mycontroller/getproductsadmin")
      .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => this.products.set(data.json()))
    .then(data => console.log("API Response:", data))
  }
*/
