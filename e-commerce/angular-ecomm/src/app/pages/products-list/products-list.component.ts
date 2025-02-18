import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.models';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (product of products(); track product.id ) {
      <app-product-card [product]="product"/>
      }
    </div>
  `,
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  products = signal<Product[]>([

    {
      id: 1,
      title: 'Blue-Pen',
      price: 100,
      image: '---',
      stock: 10,
    }, 

    {
      id: 2,
      title: 'Red-Pen',
      price: 100,
      image: '---',
      stock: 11,
    }, 
    {
      id: 3,
      title: 'A4-Paper, 100st',
      price: 50,
      image: '---',
      stock: 0,
    }, 
    {
      id: 4,
      title: 'Block',
      price: 70,
      image: '---',
      stock: 8, 
    },
    
    


  ])

}
