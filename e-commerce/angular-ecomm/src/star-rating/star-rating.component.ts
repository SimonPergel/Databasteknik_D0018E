import { Component, OnInit, OnDestroy, inject, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StarRatingService } from '../app/services/star-rating.services';
import { ProductAndRatingService } from '../app/services/productandRating.service';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <span *ngFor="let star of stars; let i = index" 
            class="star" 
            [class.filled]="star" 
            (mouseenter)="hover(i)" 
            (mouseleave)="resetHover()" 
            (click)="rate(i)">
        ★
      </span>
    </div>
  `,
  styles: [` 
    .star { 
      font-size: 30px; 
      color: lightgray; 
      cursor: pointer; 
    } 
    .star.filled { 
      color: gold; 
    } 
  `]
})
export class StarRatingComponent implements OnInit, OnDestroy {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = [false, false, false, false, false];
  hoverIndex: number | null = null;
  private productIdSubscription: Subscription | null = null;
  private ratingSubscription: Subscription | null = null;
  productId: number | null = null;

  starRatingService = inject(StarRatingService);
  productAndRatingService = inject(ProductAndRatingService);

  ngOnInit(): void {
    // Subscribe to product ID changes
    this.productIdSubscription = this.productAndRatingService.currentProductId$.subscribe((productId) => {
      if (productId !== null) {
        this.productId = productId;
        this.ratingSubscription = this.productAndRatingService.getProductIdRating().subscribe((rating) => {
          this.rating = rating || 0;
          this.updateStars();
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.productIdSubscription) {
      this.productIdSubscription.unsubscribe();
    }
    if (this.ratingSubscription) {
      this.ratingSubscription.unsubscribe();
    }
  }

  rate(starIndex: number): void {
    this.rating = starIndex + 1;
    this.updateStars();
    this.ratingChange.emit(this.rating);

    if (this.productId !== null) {
      // Call setProductId to update the product ID in the service
      this.productAndRatingService.setProductId(this.productId);  // Set the product ID in the service

      const userID = 1; // Replace with actual user ID
      this.starRatingService.starRate(userID, this.productId, this.rating)
        .then((success: any) => {
          if (success) {
            console.log('Rating successfully updated for product ID: ' + this.productId);
          } else {
            console.error('Failed to update the rating for product ID: ' + this.productId);
          }
        })
        .catch((error: any) => {
          console.error('Error updating the rating for product ID: ' + this.productId, error);
        });
    }
  }

  hover(starIndex: number): void {
    this.hoverIndex = starIndex;
    this.updateStars();
  }

  resetHover(): void {
    this.hoverIndex = null;
    this.updateStars();
  }

  updateStars(): void {
    this.stars = [0, 1, 2, 3, 4].map((index) => index < (this.hoverIndex !== null ? this.hoverIndex + 1 : this.rating));
  }
}
