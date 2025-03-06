import { Component, signal, Type, Injectable } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductCardComponent } from "./product-card/product-card.component";
import { DataService } from '../../services/data.service';
import { Cart } from '../../models/cart.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `

  <div class="p-8 grid grid-cols-2 gap-4">
    @for (product of products; track product.id ) {
      <app-product-card [product]="product"/>
      }
    </div>
  `,
  styleUrl: './products-list.component.scss'
})

@Injectable({
  providedIn: 'root'
})
export class ProductsListComponent {
  pageRating: number = 3; // Default rating 
  products: Product []=[]
  id!: string;
  //products: Cart []=[]
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.id = params['id'];
      try {
        if (await this.dataService.checkAdmin(Number(this.id))) {
          this.dataService.getProductsAdmin().subscribe( {
            next: (response) => {
              console.log("Fetched Products:", response);
              this.products = response; // Store the API data in products
              console.log('Product Object:', this.products); //  to debug
            },
            error: (error) => {
              console.error("Error fetching products:", error);
            }
          });
        }
        else {
          this.dataService.getProductsUser().subscribe( {
            next: (response) => {
              console.log("Fetched Products:", response);
              this.products = response;
              localStorage.setItem("products", JSON.stringify(this.products));
              console.log("Product Object:", this.products);
            },
            error: (error) => {
              console.error("Error fetching products:", error);
            }
          });
        }
      } catch (error: any) {
        console.error("An error occured:", error);
      }
    });
  }

  trackById(index: number, product: Product) {
    return product.id; // ✅ ✅ Improves performance by tracking items correctly
  }
}
