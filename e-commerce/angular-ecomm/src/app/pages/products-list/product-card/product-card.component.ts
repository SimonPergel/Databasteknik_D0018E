import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.models';
import { PrimaryButtonComponent } from "../../../component/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/cart.models';
import { StarRatingComponent } from '../../../../star-rating/star-rating.component';
import { ProductAndRatingService } from '../../../services/productandRating.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { take } from 'rxjs';
import { ProductsListComponent } from '../products-list.component';
import { CommentsComponent } from "../../../components/comments/comments.component";;


@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, StarRatingComponent, NgIf, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  p_Id!: number;
  pageRating: number = 3; // Default rating will now be updated to the average rating
  aggregateRating: number = 0; // Average rating from all users
  userRating: number =0;
  hasUserRated: boolean = false; // Flag to check if the user rated
  counter: number = 0; // Counter to track how many times the add button is pressed
  quantity: string = '';
  template!: string;
  id!: number;
  newPrice!: number; 

  cartService = inject(CartService);
  dataService = inject(DataService);
  productAndRatingService = inject(ProductAndRatingService);
  products = inject(ProductsListComponent);


  @Input() product!: Product;  // Corrected input usage

  constructor(
    private cdr: ChangeDetectorRef,
    private cdr2: ChangeDetectorRef,
    private route: ActivatedRoute,
    private routes: Router
  ) {}

  // This method handles the inserting into cart part
  async insertHandler() {
    if (Number(localStorage.getItem("token")) === 0) {
      alert("You have to log in to add products to your cart");
      return;
    }

    if (this.product.quantity !== 0) {
      try {
        const response = await this.cartService.insertIntoCart(Number(localStorage.getItem("token")), 1, this.product);
        console.log(`The inserting process was successful for item ${this.product.name}:`, response);
        this.counter = this.counter + 1; // Increment counter every time the add button is pressed
      } catch (error) {
        console.error(`Error during inserting process for item :`, error);
      }
    } else {
      alert(`This product is out of stock! Not possible to add this product to the cart.`);
      console.log("The item is not available in stock at the moment!");
    }
  }

  async ngOnInit() {
    if (Number(localStorage.getItem("token"))) {
      this.routes.navigate(['/'], { queryParams: { id: Number(localStorage.getItem("token")) }, queryParamsHandling: 'merge' })
    }
    this.route.queryParams.subscribe(async params => {
      this.id = params['id'];
      if (await this.dataService.checkAdmin(Number(this.id))) {;
        this.template = 'admin';
      }
      else {
        this.template = 'user';
      }
    });
    console.log("Product in ProductCard:", this.product);

    
    this.productAndRatingService.setProductId(this.product.id);

    this.productAndRatingService.getProductIdRatingFromProductCardComponent(this.product.id).pipe(
      take(1)  // Only take the first emission and automatically unsubscribe
    ).subscribe(
      rating => {
        console.log(`Fetched rating for Product ${this.product.id}:`, rating);
        this.aggregateRating = rating ?? 0;  // Set the aggregate rating once
      },
      error => {
        console.error("Error fetching rating:", error);
      }
    );
    try {
      // Await the properly fixed function
      this.productAndRatingService.getProductIdRating().pipe(
        take(1)
      ).subscribe(
        rating => {
          this.aggregateRating = rating ?? 0;
          console.log(`Updated aggregate rating for product ${this.product.id}:`, this.aggregateRating);
          this.cdr.detectChanges();  // Force UI update
        },
        error => {
          console.error(" Error fetching aggregate rating:", error);
        }
      );
    } catch (error) {
      console.error(" Error fetching user rating:", error);
    }


    //fetch personal rating
    try {
      this.userRating = await this.productAndRatingService.getP_IDRatingFromUser(this.product.id);
      console.log(`Updated user rating for product ${this.product.id}:`, this.userRating);
      
      this.cdr.detectChanges();  // Force UI update
    } catch (error) {
      console.error(" Error fetching user rating:", error);
    }
  }

  // This method will be called when the rating changes
  async onRatingChange() {
    if (this.product.id !== null) {
      // Set the productId in the ProductAndRatingService when rating changes
      this.productAndRatingService.setProductId(this.product.id);
      
      try {
        // Await the properly fixed function
        this.userRating = await this.productAndRatingService.getP_IDRatingFromUser(this.product.id);
        console.log(`Updated user rating for product ${this.product.id}:`, this.userRating);
        
        this.cdr.detectChanges();  // Force UI update
      } catch (error) {
        console.error(" Error fetching user rating:", error);
      }
      try {
        this.productAndRatingService.getProductIdRating().pipe(
          take(1)
        ).subscribe(
          rating => {
            this.aggregateRating = rating ?? 0;
            console.log(`Updated aggregate rating for product ${this.product.id}:`, this.aggregateRating);
            this.cdr.detectChanges();  // Force UI update
          },
          error => {
            console.error(" Error fetching aggregate rating:", error);
          }
        );
      } catch (error) {
        console.error(" Error fetching user rating:", error);
      }
  
      console.log("Product ID set to:", this.product.id);
    }
  }
  

  clearInput() {
    this.quantity = '';
  }

  onSubmit() {
    this.dataService.addProductQuantity(this.product.name, Number(this.quantity));
    this.cdr.detectChanges();
    this.clearInput();
    this.products.ngOnInit();
    /* this.routes.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.routes.navigate(['/'], { queryParams: { id: Number(localStorage.getItem("token")) }, queryParamsHandling: 'merge' });
    }); */

    //this.routes.navigate(['/'], { queryParamsHandling: 'preserve' })
  }


  goComments(){
    this.routes.navigate(['/comments'], { queryParams:  { pid: this.product.id}, queryParamsHandling: "merge" }); 
    console.log("Navigating to comments page");
  }



}

// CODE FOR THE SECOND QUANTITY / OUT OF STOCK TEXT //
/* 
  <span class="absolute top-2 right-3 text-sm font-bold" 
  [class]="product.inStock ? 'text-green-500' : 'text-red-500'">
  {{ product.quantity ? product.quantity + ' left' : 'Out of stock' }}
  </span>
*/
