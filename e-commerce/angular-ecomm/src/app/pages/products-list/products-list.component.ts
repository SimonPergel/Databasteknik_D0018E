import { Component, signal, Type } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductCardComponent } from "./product-card/product-card.component";
import { json1component } from '../../components/json-1/json-1.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
  
    <div class="p-8 grid grid-cols-2 gap-4">
    @for (product of products; track product.id ) {
      <app-product-card [product]="product"/>
      }
    </div>
    
<!--
    <div class="p-8 grid grid-cols-2 gap-4">
      <app-product-card 
        *ngFor="let product of products; trackBy: trackById" 
        [product]="product">
      </app-product-card>
    </div>
    -->
  `,
  styleUrl: './products-list.component.scss'
})

export class ProductsListComponent {
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
